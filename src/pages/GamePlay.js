import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { auth, intMessaging as messaging } from "../services/firebase";
import RoomService from "../services/firestore";
import DBService from "../services/firebaseDB";
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
      gameCount: 0
    };
    this.shake = this.shake.bind(this);
    this.getData = this.getData.bind(this);
    this.getRoomDetal = this.getRoomDetal.bind(this);
    this.onBetChange = this.onBetChange.bind(this);
    this.showSnakeModal = this.showSnakeModal.bind(this);
    this.onResetGame = this.onResetGame.bind(this);
    this.renderPlayBox = this.renderPlayBox.bind(this);
  }

  shake() {
    var { roomId, bets, user, result } = this.state;
    var users = {};
    result = [this.randomItem(), this.randomItem(), this.randomItem()];

    Object.keys(bets).reduce((object, key) => {
      const item = bets[key];
      var coin = 0;
      Object.keys(item).reduce((object, key) => {
        var count = this.countValue(result, key);
        if (count > 0) {
          coin += count * item[key];
        } else {
          coin -= item[key];
        }
        return object;
      }, {});
      users[key] = coin;
      return object;
    }, {});

    RoomService.getById(roomId).then(data => {
      var room = data.data();
      users[user.uid] = 0;

      Object.keys(users).reduce((object, key) => {
        if (key !== user.uid) {
          users[user.uid] -= users[key];
          room.users[key] += users[key];
        }
        return object;
      }, {});
      room.users[user.uid] += users[user.uid];
      RoomService.update(roomId, room);
    });

    db.ref(roomId).update({
      status: 2,
      bets: {},
      result: result
    });
    setTimeout(
      () => this.onResetGame(),
      3000
    );
  }

  onResetGame() {
    db.ref(this.state.roomId).update({
      status: 0
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
    this.getRoomDetal();
    this.getData();
  }

  getRoomDetal() {
    const { roomId, user } = this.state;
    RoomService.getAll().doc(roomId).onSnapshot(data => {
      var { scoresChange, scores } = this.state;
      var room = data.data();
      // lần đầu vào room
      if (room.users[user.uid] === undefined) {
        room.users[user.uid] = 0; // cập nhập danh sách user của room
        RoomService.update(roomId, room);
      }

      DBService.writeChats(roomId, {
        content: user.displayName + " đã vào phòng",
        timestamp: Date.now(),
        name: user.displayName,
        avatar: this.renderphotoURL(user.email),
        uid: user.uid
      });
      scoresChange = room.users[user.uid] - scores;
      this.setState({
        scores: room.users[user.uid],
        scoresChange: scoresChange,
        isOwner: room.uid === user.uid
      });
    });
  }

  componentWillUnmount() {
    const { roomId, user } = this.state;
    DBService.writeChats(roomId, {
      content: user.email + " đã thoát khỏi phòng",
      timestamp: Date.now(),
      name: user.displayName,
      avatar: this.renderphotoURL(user.email),
      uid: user.uid
    });
  }

  getData() {
    var { roomId, status, result, bets, isOwner, gameCount } = this.state;
    db.ref(roomId).on("value", snapshot => {
      bets = {};
      snapshot.forEach(snap => {
        if (snap.key === "bets") {
          bets = snap.val();
        } else if (snap.key === "status") {
          status = snap.val();
        } else if (snap.key === "result") {
          result = snap.val();
        }
      });
      var { items, user } = this.state;
      items.forEach((item, key) => {
        var users = [];
        item.value = 0;
        item.users = users;
        Object.keys(bets).reduce((object, key) => {
          if (bets[key][item.name] !== undefined) {
            users.push({
              uid: key,
              value: bets[key][item.name] || 0,
              color: this.onRenderColor(key)
            });
          };

          if (isOwner) {
            item.value += bets[key][item.name] || 0;
          } else if (key === user.uid) {
            item.value = bets[key][item.name] || 0;
          }
          return object;
        }, {});
      });

      this.setState({ bets: bets, items: items, result: result, status: status, isLoading: false });
    });
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

  onBetChange(name, value) {
    const { bets } = this.state;
    const { roomId, user } = this.state;
    var data = bets[user.uid] || [];

    data[name] = value;
    const newData = Object.keys(data).reduce((object, key) => {
      if (data[key] > 0) {
        object[key] = data[key];
      }
      return object
    }, {});
    db.ref(roomId + "/bets/" + user.uid).set(newData);
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
    const { isLoading, status, isOwner, result, items, scores, scoresChange, bets } = this.state;
    if (isLoading) {
      return <div>Is Loading</div>
    }
    return (
      <div className="home">
        <Header></Header>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container">
              <div className="row">
                <div className="col-sm-10">
                  {this.renderPlayBox(items)}
                </div>
                <div className="col-sm-2">
                  {isOwner && Object.keys(bets).length > 0 ? <button onClick={this.showSnakeModal}>Lắc</button> : ""}
                  {scores}
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