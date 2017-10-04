import React, { Component } from 'react'
import Message from './message.jsx'

class MessageList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("Rendering <MessageList/>")

    const inheritMessageProps = this.props.meat
    const inheritNotificationProps = this.props.newNotify

    const submissions = inheritMessageProps.map((message) =>
      <div className="message" key={message.id}>
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    )

    // const notifications = inheritNotificationProps.map((message) =>
    //   <div className="message">
    //     <div className="message system">
    //       {message.oldUser} changed their username to {message.newUser}
    //       </div>
    //   </div>
    // )

    return (
      <div>
        {submissions}

      </div>
    )
  }
}

export default MessageList