import React from 'react';
import PlayBox from '../PlayBox/PlayBox';

class OwnerPLayer extends React.Component{
  render(){
      const {items, onClick} = this.props;
      return items.map(function (item, i) {
          return <PlayBox key={i} name={item.name} value={item.value} 
              style={item.style} isActive={item.isActive}
              onClick = {onClick}
              users = {item.users}
          />
        });
  }
}

export default OwnerPLayer