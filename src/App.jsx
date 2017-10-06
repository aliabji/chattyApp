
import React, { Component } from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './messageList.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: { name: "NewUser" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      size: 0
    }
  }

  scrollToBottom = () => {
    const node = this.refs.Bottomdiv;
    node.scrollIntoView({ behavior: "smooth" });
  }


  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
    console.log('Connected to server')
    console.log("componentDidMount <App />")

    this.socket.onmessage = (event) => {
      let incomingMsg = JSON.parse(event.data)
      switch (incomingMsg.type) {
        case "incomingMessage":
          let serverNewMessageInfo = [...this.state.messages, {
            type: incomingMsg.type,
            id: incomingMsg.id,
            username: incomingMsg.username,
            content: incomingMsg.content
          }]
          console.log("New message info :", serverNewMessageInfo)
          this.setState({ messages: serverNewMessageInfo })
          break
        case "incomingNotification":
          let notification = [...this.state.messages, {
            type: "incomingNotification",
            id: incomingMsg.id,
            oldUser: incomingMsg.oldUser,
            newUser: incomingMsg.newUser
          }]
          this.setState({ messages: notification })
          break
        case "incomingConnectNotification":
          let userNotification = [...this.state.messages, {
            type: incomingMsg.type,
            id: incomingMsg.id,
            content: incomingMsg.content
          }]
          this.setState({ messages: userNotification })
          break
        case "incomingSize":
          console.log("SIIIIIIIIIZZZZZEEEEEE", incomingMsg.size)
          this.setState({ size: incomingMsg.size })
          break
      }
    }
  }

  //Scrolling down to empty div every time component is mounted.
  componentDidUpdate() {
    this.scrollToBottom();
  }

  userChanger = (change) => {
    let notificationMessage = {
      type: "postNotification",
      oldUser: this.state.currentUser.name,
      newUser: change
    }
    this.setState({ currentUser: { name: change } })

    this.socket.send(JSON.stringify(notificationMessage))
  }

  addNewMsg = (msg) => {
    let newMessageInfo = {
      type: "postMessage",
      id: null,
      username: this.state.currentUser.name,
      content: msg
    }
    this.socket.send(JSON.stringify(newMessageInfo))
  }

  render() {
    console.log("Rendering <App/>")

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h5>{this.state.size} users online</h5>
        </nav>
        <main className="messages">
          <MessageList msgs={this.state.messages} />

          <div style={{ float: "left", clear: "both" }}
            ref="Bottomdiv">
          </div>
        </main>
        <footer>
          <ChatBar ali={this.state.currentUser} bubble={this.addNewMsg} userBubble={this.userChanger} />
        </footer>
      </div>
    )
  }
}
export default App
