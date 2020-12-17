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
    this.props.onClick(this.props.name, value);
  };

  handlePlus = (event: Event) => {
    event.preventDefault();
    let value = this.props.value + 10;
    this.props.onClick(this.props.name, value);
  };
 
  render() {
    const {value, users, name} = this.props;
    return (
      <div className={`playBox col-xs-12 col-sm-4`}>
          <div className={`playItem ${name}`}></div>
          {users?users.map(item =>{
            var userStyle ={
              width: item.value,
              height: item.value,
              lineHeight: (item.value > 150 ? 150 : item.value)+"px",
              backgroundColor: item.color
            }
            return <div key={item.uid} className="userSelect" style={userStyle}>
              {item.name}
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
