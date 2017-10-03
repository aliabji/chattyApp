import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      username: this.props.name,
      message: ''
    }
  }
  render() {
    return (
      <div className="chatbar">
        <input className="chatbar-username"  placeholder={this.props.ali.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleKeyPress}/>
      </div>
    )
  }
}

export default ChatBar;