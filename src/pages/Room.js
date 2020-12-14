import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { auth } from "../services/firebase";
import RoomService from "../services/firestore";

export default class RoomPage extends Component {
    constructor(props){
        super(props);
        this.onDataChange = this.onDataChange.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
        if(data && (data.uid === uid || data.users[uid])){
          rooms.push({
            id: id,
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
    async handleSubmit(event) {
        event.preventDefault();
        let data = {
          uid: this.state.user.uid,
          name: this.state.name,
          users: {}
        };
        data.users[this.state.user.uid]= 0;
    
        RoomService.create(data)
          .then(() => {
            console.log("Created new item successfully!");
            this.setState({
              submitted: true,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
  render() {
    const {rooms, name} = this.state;
    return (
      <div className="home">
        <Header></Header>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <form onSubmit={this.handleSubmit} className="mx-3">
              <input value={name} onChange={this.onChangeName}/>
              <button type="submit" className="btn btn-submit px-5 mt-4">Tạo phòng mới</button>
            </form>
          </div>
          <ul>
          {rooms.map(function(room, i){
            return <li key={i}>
              <Link className="" to={`/game/${room.id}`}>{room.name}</Link>
              </li>;
          })}
          </ul>
        </section>
        <Footer></Footer>
      </div>
    )
  }
}
