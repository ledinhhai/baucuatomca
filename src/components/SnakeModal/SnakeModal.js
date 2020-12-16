import React from 'react';
import "./SnakeModal.scss"

class SnakeModal extends React.Component {
    state = {
        className: "open"
    }
    componentDidMount() {
        if (this.props.status === 1) {
            setTimeout(
                () => this.setState({ className: "closing" }),
                1000
            );
            setTimeout(
                () => this.setState({ className: "closing in" }),
                3000
            );
        }
    }
    componentDidUpdate () {
        if( this.props.status === 2 ){
            setTimeout(
                () => this.setState({ className: "open" }),
                1000
            );
        }
    }
    render() {
        const { result, onClick} = this.props;
        return <div className="snakeModal">
            <div className={`boder ${this.state.className}`}>
            <div className="groupItem">
                {result.map((element, i) => {
                   return<div key={i} className={`item ${element.name}`}></div>
                })}
                  </div>
                 {/* {this.props.status === 2?
                    <button onClick= {onResetGame}>Game mới</button>:""
                 }  */}
                <div className="cover">
                    {this.props.isOwner ?
                        <button onClick={onClick} className="btnOpen" >Mở</button> : ""}
                </div>
            </div>
        </div>
    }
}

export default SnakeModal