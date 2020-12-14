// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { Dispatch } from '../../types';

import './Playbox.scss';

export type Props = {
  style: Object,
  dispatch: Dispatch
};

export type State = {
  value: Number
};

class PlayBox extends Component<Props, State> {
 
  handleMinus = (event: Event) => {
    event.preventDefault();
    
    let value = this.props.value - 10;
    //this.setState({ value: value });
    //this.props.dispatch(minusBet(this.props.name, 10));
    this.props.onClick(this.props.name, value);
  };

  handlePlus = (event: Event) => {
    event.preventDefault();
    let value = this.props.value + 10;
    //this.setState({ value: value });
    this.props.onClick(this.props.name, value);
    //this.props.dispatch(plusBet(this.props.name, 10));
  };
 
  render() {
    let overlay;
    const {isActive, style, value, users} = this.props;
    if(!isActive){
      overlay= <div className="overlay"></div>;
    }
    
    return (
      <div className={`playBox`}>
          {overlay}
          <div className="playItem" style={style}></div>
          {users?users.map(item =>{
            var userStyle ={
              width: item.value,
              height: item.value,
              lineHeight: item.value+"px",
              backgroundColor: item.color
            }
            console.log(item.color);
            return <div key={item.uid} className="userSelect" style={userStyle}>
              {item.uid.charAt(0)}
            </div>
          }):""}
          <div className ="boxControl">
          <button onClick={this.handleMinus}><i className="fa fa-minus"></i></button>
          <input disabled value={value}/>
          <button onClick={this.handlePlus}><i className="fa fa-plus"></i></button>
          </div>
      </div>
    );
  }
}

export default connect()(PlayBox);
