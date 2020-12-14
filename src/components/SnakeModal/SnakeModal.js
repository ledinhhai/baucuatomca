import React from 'react';
import "./SnakeModal.scss"
class SnakeModal extends React.Component {
    state= {
        className:""
    }
    componentDidMount(){
        setTimeout(
            () => this.setState({ className: "start" }), 
            1000
          );
        setTimeout(
            () => this.setState({ className: "start in" }), 
            2000
          );
    }
    render() {
        return <div className="snakeModal">
            <div className={`boder ${this.state.className}`}>
                <div className="groupItem">
                    <div className="item">
                    </div>
                    <div className="item">
                    </div>
                    <div className="item">
                    </div>
                </div>
                <div className="cover">
                    {this.props.isOwner?
                    <button onClick={this.props.onClick} className="btnOpen" >Mở</button>:""}
                </div>
            </div>
        </div>
    }
}

export default SnakeModal