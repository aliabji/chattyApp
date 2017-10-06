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

  handleUserChange = (evt) => {
    if (evt.key === 'Enter')
    this.props.userBubble(evt.target.value)
  }

  handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      this.props.bubble(evt.target.value)
      evt.target.value = ""
    }
  }

  render() {
    return (
      <div className="chatbar">
        <input className="chatbar-username" placeholder={this.props.ali.name + ", press ENTER to change Username"} onKeyPress={this.handleUserChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress} />
      </div>
    )
  }
}

export default ChatBar;