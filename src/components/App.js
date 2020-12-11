// @flow

import React from 'react';
import { connect } from 'react-redux';
import bets from '../reducers/bet'

import GamePlay from '../containers/GamePlay';
import Bet from '../containers/Bet';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.items = [
      {
        name:"Nai",
        style :{backgroundPosition: '-28px -75px'},
        value: 0
      },
      {
        name:"Bau",
        style :{backgroundPosition: '-435px -75px'},
        value: 0
      },
      {
        name:"Ga",
        style :{backgroundPosition: '-845px -75px'},
        value: 0
      },
      {
        name:"Ca",
        style :{backgroundPosition: '-28px -385px'},
        value: 0
      },
      {
        name:"Cua",
        style :{backgroundPosition: '-435px -385px'},
        value: 0
      },
      {
        name:"Tom",
        style :{backgroundPosition: '-845px -385px'},
        value: 0
      }
    ]
    this.shake =  this.shake.bind(this);
    //this.randomItem =  this.randomItem.bind(this);
  }
  shake(){
    var bets = this.props.bets; 
    if( bets && bets.length < 1) {
      return alert("Vui lòng đặt số");
    }
    var result = [this.randomItem(),this.randomItem(), this.randomItem()];
    var coin = 0;
    bets.forEach(item =>{
        var count = this.countValue(result, item.name);
        if(count > 0){
          coin += count * item.value;
        }else {
          coin -= item.value;
        }
    });
    var kq ="";
    result.map(item => kq += " " + item.name);
    alert(kq + " " + coin);
  }

  randomItem(){
    const min = 0;
    const max = this.items.length;
    const rand = Math.floor(Math.random() * max)+ min;
    return this.items[rand];
  }
  
  countValue(arrItems, itemToCheck){
    var result = 0;
    arrItems.map(item =>{
      if(item.name == itemToCheck){
        return result += 1;
      }
    });
    return result;
  }
  render(){
    return <div>
        <GamePlay items = {this.items}/>
        <Bet items = {this.props.bets} onClick = {this.shake} />
    </div>
    
  }
}

const mapStateToProps = (state) => ({
  bets: state.bets,
})
export default connect(mapStateToProps)(App)