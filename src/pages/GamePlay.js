import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { auth, intMessaging as messaging } from "../services/firebase";
import RoomService from "../services/firestore";
import OwnerPLayer from "../components/OwnerPLayer/OwnerPLayer";
import SnakeModal from "../components/SnakeModal/SnakeModal";
import PlayBox from "../components/PlayBox/PlayBox";

import md5 from 'md5';

import { db } from '../services/firebase';


export default class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: false,
      user: auth().currentUser,
      roomId: props.match.params.roomid,
      isLoading: true,
      items: [
        {
          name: "Nai",
          value: 0
        },
        {
          name: "Bau",
          value: 0
        },
        {
          name: "Ga",
          value: 0
        },
        {
          name: "Ca",
          value: 0
        },
        {
          name: "Cua",
          value: 0
        },
        {
          name: "Tom",
          value: 0
        }
      ],
      result: [
        {
          name: "Bau",
          value: 0
        },
        {
          name: "Bau",
          value: 0
        },
        {
          name: "Bau",
          value: 0
        }
      ],
      bets: {},
      status: 0,
      scores: 0,
      scoresChange: 0,
      gameCount: 0,
      chats: []
    };
    this.shake = this.shake.bind(this);
    this.getData = this.getData.bind(this);
    this.getRoomDetal = this.getRoomDetal.bind(this);
    this.onBetChange = this.onBetChange.bind(this);
    this.showSnakeModal = this.showSnakeModal.bind(this);
    this.onResetGame = this.onResetGame.bind(this);
    this.renderPlayBox = this.renderPlayBox.bind(this);

    this.unsubscribe = undefined;
  }

  shake() {
    var { roomId, bets, user, result } = this.state;
    var scores = {};
    result = [this.randomItem(), this.randomItem(), this.randomItem()];

    Object.keys(bets).reduce((object, userId) => {
      const item = bets[userId];
      var coin = 0;
      Object.keys(item).reduce((object, key) => { // key is Bau Cua Tom Ca...
        var count = this.countValue(result, key);
        if (count > 0) {
          coin += count * item[key];
        } else {
          coin -= item[key];
        }
        return object;
      }, {});
      scores[userId] = coin;
      return object;
    }, {});
    
    RoomService.getById(roomId).then(data => {
      var room = data.data();
      var key =`${user.displayName.charAt(0)}${user.uid}`;
      scores[key] = 0; // reset diem chu phong
      Object.keys(scores).reduce((object, userId) => {
        if (userId !== key) {// không phải là chủ phòng
          scores[key] -= scores[userId]; // điểm của chủ phòng bằng hiện tại trừ cho điểm player 
          room.users[userId]["scores"] += scores[userId]; // Update điểm của player 
        }
        return object;
      }, {});
      room.users[key]["scores"] += scores[key];
      RoomService.update(roomId, room);
    });

    db.ref(roomId).update({
      status: 2,
      bets: {},
      result: result
    });
    setTimeout(
      () => this.onResetGame(),
      5000
    );
  }

  onResetGame() {
    var { roomId, gameCount, result } = this.state;
    db.ref(roomId).update({
      status: 0,
      game: gameCount + 1
    });
    db.ref(roomId + "/list/" + roomId + gameCount).set({
      content: `Game ${(gameCount + 1)}: ${result.map(item => item.name)} `,
      timestamp: Date.now()
    });
  }

  randomItem() {
    const min = 0;
    const max = this.state.items.length;
    const rand = Math.floor(Math.random() * max) + min;
    return this.state.items[rand];
  }

  countValue(arrItems, itemToCheck) {
    var result = 0;
    arrItems.map(item => item.name === itemToCheck ? result += 1 : result);
    return result;
  }

  componentDidMount() {
    localStorage.removeItem("Redirect");
    const { roomId, user } = this.state;
    db.ref(roomId + "/list/" + user.uid).set({
      content: user.displayName + " đã vào phòng",
      timestamp: Date.now(),
      name: user.displayName,
      avatar: this.renderphotoURL(user.email),
      uid: user.uid
    });
    this.unsubscribe = RoomService.getAll().doc(roomId).onSnapshot(this.getRoomDetal);
    this.getData();
  }

  getRoomDetal(data) {
      var { scoresChange, scores, user, roomId } = this.state;
      var room = data.data();
      if (room === undefined) {
        return this.props.history.push('/');
      }
      var key =`${user.displayName.charAt(0)}${user.uid}`;
      // lần đầu vào room
      if (room.users[key] === undefined) {
        room.users[key] = {
          name: user.displayName,
          scores: 0
        }; // cập nhập danh sách user của room
        RoomService.update(roomId, room);
      }
      scoresChange = room.users[key].scores - scores;
      this.setState({
        scores: room.users[key].scores,
        scoresChange: scoresChange,
        isOwner: room.uid === user.uid,
        users: room.users
      });
  }

  componentWillUnmount() {
    const { roomId, user } = this.state;
    db.ref(roomId + "/list/" + user.uid).set({
      content: user.displayName + " đã thoát khỏi phòng",
      timestamp: Date.now(),
      name: user.displayName,
      avatar: this.renderphotoURL(user.email),
      uid: user.uid
    });
    this.unsubscribe();
    db.ref(roomId).off();
  }

  getData() {
    var { roomId, status, result, bets, chats, gameCount } = this.state;
    db.ref(roomId).on("value", snapshot => {
      bets = {};
      snapshot.forEach(snap => {
        if (snap.key === "game") {
          gameCount = snap.val() || 0;
        } else if (snap.key === "bets") {
          bets = snap.val();
        } else if (snap.key === "status") {
          status = snap.val();
        } else if (snap.key === "result") {
          result = snap.val();
        } else if (snap.key === "list") {
          var data = snap.val();
          chats = [];
          Object.keys(data).map(key => {
            data[key] && chats.push(data[key]);
          })
        }
      });
      var { items, user, isOwner } = this.state;
      items.forEach((item, key) => {
        var users = [];
        item.value = 0;
        item.users = users;
        Object.keys(bets).reduce((object, key) => {
          if (bets[key][item.name] !== undefined) {
            users.push({
              uid: key,
              name: key.charAt(0),
              value: bets[key][item.name] || 0,
              color: this.onRenderColor(key)
            });
          };

          if (isOwner) {
            item.value += bets[key][item.name] || 0;
          } else if (key === `${user.displayName.charAt(0)}${user.uid}`) {
            item.value = bets[key][item.name] || 0;
          }
          return object;
        }, {});
      });
      this.setState({
        bets: bets,
        gameCount: gameCount,
        items: items,
        result: result,
        status: status,
        isLoading: false,
        chats: chats.sort((a, b) => a.timestamp < b.timestamp ? -1 : 1)
      });
    });
  }
  componentDidUpdate() {
    this.chatArea && this.chatArea.scrollBy(0, this.chatArea.scrollHeight);
  }

  renderphotoURL(email) {
    return "http://www.gravatar.com/avatar/" + md5(email) + ".jpg?s=300";
  }

  showSnakeModal() {
    const refId = this.state.roomId;
    db.ref(refId).update({
      status: 1
    });
  }

  onRenderColor(key) {
    var number = Number(key.replace(/\D/g, '')) + 11111111;
    return "#" + (number.toString(16).substring(0, 6));
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}}`;
    return time;
  }
  onBetChange(name, value) {
    const { roomId, user, bets, gameCount } = this.state;
    var data = bets[`${user.displayName.charAt(0)}${user.uid}`] || [];
    console.log(data);
    data[name] = value;
    const newData = Object.keys(data).reduce((object, key) => {
      if (data[key] > 0) {
        object[key] = data[key];
      }
      return object
    }, {});
    console.log(bets);
    db.ref(`${roomId}/list/${user.uid}${gameCount}`).set({
      avatar: this.renderphotoURL(user.email),
      content: `${user.displayName} đã đặt cược ${Object.keys(newData).map(key => key)}`,
      timestamp: Date.now(),
      uid: user.uid
    });
    db.ref(`${roomId}/bets/${user.displayName.charAt(0)}${user.uid}`).set(newData);
  }

  renderPlayBox(items) {
    if (this.state.isOwner) {
      return items.map(function (item, i) {
        return <OwnerPLayer key={i} name={item.name} value={item.value}
          style={item.style} isActive={item.isActive}
          users={item.users}
        />
      });
    } else {
      const onClick = this.onBetChange;
      return items.map(function (item, i) {
        return <PlayBox key={i} name={item.name} value={item.value}
          style={item.style} isActive={item.isActive}
          users={item.users}
          onClick={onClick}
        />
      });
    }
  }

  render() {
    const { isLoading, status, isOwner, result, items, scores, scoresChange, bets, chats, users, user } = this.state;
    if (isLoading) {
      return <div>Is Loading</div>
    }
    return (
      <div className="home">
        <Header></Header>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-10">
                  {this.renderPlayBox(items)}
                </div>
                <div className="col-sm-2">
                  <div className="chat-area" ref={(input) => { this.chatArea = input; }} >
                    {chats.map(chat => {
                      return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
                        {chat.content}
                      </p>
                    })}
                  </div>
                  {isOwner && Object.keys(bets).length > 0 ? <button className="btn btn-primary mt-5" onClick={this.showSnakeModal}>Lắc</button> : ""}
                  <p>Điểm số: {scores}</p>
                  <ul>
                    {isOwner && Object.keys(users).map(item =>{
                      
                      if(item !== `${user.displayName.charAt(0)}${user.uid}`){
                        return <li key={item}>{users[item].name}: {users[item].scores}</li>
                      }
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
        {status !== 0 ? <SnakeModal isOwner={isOwner} onClick={this.shake}
          onResetGame={this.onResetGame}
          result={result} status={status}></SnakeModal> : ""}
        {status === 2 ? <div className={`updateScore ${scoresChange < 0 ? "error" : scoresChange > 0 ? "success" : ""}`}>{scoresChange}</div> : ""}
      </div>
    )
  }
}