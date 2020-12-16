import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../PlayBox/Playbox.scss';

class OwnerPLayer extends Component{
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
              {item.uid.charAt(0)}
            </div>
          }):""}
          <div className ="boxControl">
          {/* <button type="button"><i className="fa fa-minus"></i></button> */}
          <input disabled value={value}/>
          {/* <button type="button"><i className="fa fa-plus"></i></button> */}
          </div>
      </div>
    );
  }
}

export default connect()(OwnerPLayer);
