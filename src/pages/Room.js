import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { auth } from "../services/firebase";
import RoomService from "../services/firestore";

export default class RoomPage extends Component {
  constructor(props) {
    super(props);
    this.onDataChange = this.onDataChange.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeRoom = this.removeRoom.bind(this);

    this.state = {
      rooms: [],
      user: auth().currentUser,
      name: ""
    };

    this.unsubscribe = undefined;

  }
  componentDidMount() {
    this.unsubscribe = RoomService.getAll().orderBy("name", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let rooms = [];
    const uid = this.state.user.uid;
    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      if (data && (data.uid === uid || data.users[uid])) {
        rooms.push({
          id: id,
          uid: data.uid,
          name: data.name,
          users: data.users
        });
      }

    });

    this.setState({
      rooms: rooms,
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  removeRoom(roomId) {
    RoomService.delete(roomId);
  }
  async handleSubmit(event) {
    event.preventDefault();
    var { name, user } = this.state;
    if (name.length === 0) {
      this.roomName.focus();
      return;
    }
    let data = {
      uid: user.uid,
      name: name,
      users: {}
    };
    data.users[`${user.displayName.charAt(0)}${user.uid}`] = {
      name: user.displayName,
      scores: 0
    };

    RoomService.create(data)
      .then(() => {
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { rooms, name, user } = this.state;
    const removeRoom = this.removeRoom;
    return (
      <div className="home">
        <Header></Header>
        <section className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="float-left">Danh sách phòng</h1>
              <form onSubmit={this.handleSubmit} className="form-inline float-right">
                <input className="form-control"
                  ref={(input) => { this.roomName = input; }}
                  placeholder="Nhập tên phòng" value={name} onChange={this.onChangeName} />
                <button type="submit" className="btn btn-primary ml-5">Tạo phòng mới</button>
              </form>
            </div>
          </div>
          <ul className="list-group mt-5 mb-5 list-room">
            {rooms.map(function (room, i) {
              return <li key={i} className="list-group-item">
                <Link className="" to={`/game/${room.id}`}>
                  {room.name.length > 0 ? room.name : "Chưa đặt tên"}
                </Link>
                <span className="small ml-5">{Object.keys(room.users).length ?? 0} người chơi</span>
                <span className="ml-5">Điểm số: {room.users[user.uid]}</span>
                {
                  room.uid === user.uid ?
                    <button className="btn btn-danger float-right"
                      onClick={() => { if (window.confirm('Delete the item?')) { removeRoom(room.id) }; }}>
                      <i className="fa fa-trash  "></i></button> : ""
                }
              </li>;
            })}
          </ul>
        </section>
        <Footer></Footer>
      </div>
    )
  }
}
