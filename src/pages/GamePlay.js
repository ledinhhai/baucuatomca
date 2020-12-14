import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { auth, intMessaging as messaging } from "../services/firebase";
import RoomService from "../services/firestore";
import DBService from "../services/firebaseDB";

import OwnerPLayer from "../components/OwnerPLayer/OwnerPLayer";
import SnakeModal from "../components/SnakeModal/SnakeModal";

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
          style: { backgroundPosition: '-28px -75px' },
          value: 0,
          isActive: true
        },
        {
          name: "Bau",
          style: { backgroundPosition: '-435px -75px' },
          value: 0,
          isActive: true
        },
        {
          name: "Ga",
          style: { backgroundPosition: '-845px -75px' },
          value: 0,
          isActive: true
        },
        {
          name: "Ca",
          style: { backgroundPosition: '-28px -385px' },
          value: 0,
          isActive: true
        },
        {
          name: "Cua",
          style: { backgroundPosition: '-435px -385px' },
          value: 0,
          isActive: true
        },
        {
          name: "Tom",
          style: { backgroundPosition: '-845px -385px' },
          value: 0,
          isActive: true
        }
      ],
      result: [],
      bets: [],
      status: 0,
    };
    this.shake = this.shake.bind(this);
    this.getData = this.getData.bind(this);
    this.onBetChange = this.onBetChange.bind(this);
    this.showSnakeModal = this.showSnakeModal.bind(this);

  }

  shake() {
    const { roomId, items, bets, user } = this.state;
    this.result = [this.randomItem(), this.randomItem(), this.randomItem()];
    var users = {};
    Object.keys(bets).reduce((object, key) => {
      const item = bets[key];
      var coin = 0;
      Object.keys(item).reduce((object, key) => {
        var count = this.countValue(this.result, key);
        if (count > 0) {
          coin += count * item[key];
        } else {
          coin -= item[key];
        }
        return object;
      }, {});
      users[key]= coin;
    }, {});
    items.forEach(item => {
      var count = this.countValue(this.result, item.name);
      item.isActive = count > 0;
    });
    this.setState({
      items: items
    });

    RoomService.getById(roomId).then(data => {
      var room = data.data();
      users[user.uid] = 0;

      Object.keys(users).reduce((object, key) => {
        if(key !== user.uid){
          users[user.uid] -= users[key];
          room.users[key] += users[key];
        }
        return object;
      }, {});
      room.users[user.uid] += users[user.uid];
      RoomService.update(roomId, room);
    });

    db.ref(roomId).update({
      status: 0,
      bets:{}
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
    const { roomId, user } = this.state;
    RoomService.getById(roomId).then(data => {
      var room = data.data();
      if (room.uid === user.uid) {
        this.setState({ isOwner: true });
      } else {
        // lần đầu vào room
        if (room.users[user.uid] === undefined) {
          room.users[user.uid] = 0; // cập nhập danh sách user của room
          RoomService.update(roomId, room);
        }
      }
    }).then(item => this.setState({ isLoading: false }));
    DBService.writeChats(roomId, {
      content: user.email + " đã vào phòng",
      timestamp: Date.now(),
      uid: user.uid
    });
    this.getData();
  }
  componentWillUnmount() {
    const { roomId, user } = this.state;
    DBService.writeChats(roomId, {
      content: user.email + " đã thoát khỏi phòng",
      timestamp: Date.now(),
      uid: user.uid
    });
  }

  getData() {
    const refId = this.state.roomId;
    db.ref(refId).on("value", snapshot => {
      var bets = [];
      snapshot.forEach(snap => {
        if (snap.key === "bets") {
          bets = snap.val();
        } else if (snap.key === "status") {
          this.setState({ status: snap.val() || 0 });
        }
      });
      var { items, user } = this.state;
      items.forEach((item, key) => {
        var users = [];
        Object.keys(bets).reduce((object, key) => {
          if (bets[key][item.name] !== undefined) {
            users.push({
              uid: key,
              value: bets[key][item.name] || 0,
              color: this.onRenderColor(key)
            });
          };
          item.users = users;
          if (key === user.uid) {
            item.value = bets[key][item.name] || 0;
          }
          return object;
        }, {});
      })
      this.setState({ bets: bets, items: items });
    });
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

  render() {
    const { isLoading, status, isOwner } = this.state
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
                <div className="col-10">
                  <OwnerPLayer items={this.state.items} result={this.result} onClick={this.onBetChange} />
                </div>
                <div className="col-2">
                  {isOwner ? <button onClick={this.showSnakeModal}>Xúc</button> : ""}
                  {/* <Bet items = {this.props.bets} onClick = {this.shake} result = {this.result}/> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
        {status === 1 ? <SnakeModal isOwner={isOwner} onClick={this.shake}></SnakeModal> : ""}
      </div>
    )
  }
}