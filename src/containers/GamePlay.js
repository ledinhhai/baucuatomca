import React from 'react';
import PlayBox from './PlayBox';

class GamePlay extends React.Component{
    constructor(props) {
      super(props);
    }
    
    render(){
        return this.props.items.map(function (item, i) {
            return <PlayBox key={i} name={item.name} value={item.value}  style={item.style}/>
          });
    }
  }
  
  export default GamePlay