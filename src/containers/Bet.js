import React from 'react';
import PlayBox from './PlayBox';

class Bet extends React.Component{
    constructor(props) {
      super(props);
    }
    
    render(){
        return <div>
            {this.props.items.map(function (item, i) {
            return <div key={i}>
                {item.name} - {item.value}
            </div>
          })}
          <button onClick= {this.props.onClick}>Lắc</button>
        </div>;
    }
  }
  
  export default Bet