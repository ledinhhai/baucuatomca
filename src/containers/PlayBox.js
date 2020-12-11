// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { plusBet, minusBet } from '../actions/bet';

import type { Dispatch } from '../types';

import './Playbox.css';

export type Props = {
  style: Object,
  dispatch: Dispatch
};

export type State = {
  value: Number
};

class PlayBox extends Component<Props, State> {
  state = {
    value: this.props.value
  };
 
  handleMinus = (event: Event) => {
    event.preventDefault();
    if (this.state.value === 0) {
      return;
    }
    this.setState({ value: this.state.value - 10 });
    this.props.dispatch(minusBet(this.props.name, 10));
  };

  handlePlus = (event: Event) => {
    event.preventDefault();
    this.setState({ value: this.state.value +10 });
    this.props.dispatch(plusBet(this.props.name, 10));
  };
 
  render() {
    return (
      <div className="playBox">
          <div className="playItem" style={this.props.style}></div>
          <div className ="boxControl">
          <button onClick={this.handleMinus}><i className="fa fa-minus"></i></button>
          <input disabled value={this.state.value}/>
          <button onClick={this.handlePlus}><i className="fa fa-plus"></i></button>
          </div>
      </div>
    );
  }
}

export default connect()(PlayBox);
