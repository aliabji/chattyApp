import React, { Component } from 'react';
import Message from './message.jsx'

class MessageList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log("Rendering <MessageList/>")
    const inheritProps = this.props.meat
    const submissions = inheritProps.map((message) => 
      <div className="message" key={message.id}>
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    )
    return (
      <div>
          {submissions}

        <Message />
      </div>
    )
  }
}

export default MessageList;