
import React, { Component } from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './messageList.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
    console.log('Connected to server')
    console.log("componentDidMount <App />")

  }

  userChanger = (change) => {
    this.setState({ currentUser: { name: change } })
  }

  addNewMsg = (msg) => {
    let newMessageInfo = {
      type: "postMessage",
      id: null,
      username: this.state.currentUser.name,
      content: msg
    }
    this.socket.send(JSON.stringify(newMessageInfo))

    this.socket.onmessage = (event) => {
      let incomingMsg = JSON.parse(event.data)
      console.log("Incoming Message ", incomingMsg.id)
      let serverNewMessageInfo = [...this.state.messages, {
        id: incomingMsg.id,
        username: incomingMsg.username,
        content: incomingMsg.content
      }]
      console.log("New message info :", serverNewMessageInfo)
      this.setState({messages: serverNewMessageInfo})
    }
  }

  render() {
    console.log("Rendering <App/>")

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main className="messages">
          <MessageList meat={this.state.messages} />
        </main>
        <footer>
          <ChatBar ali={this.state.currentUser} bubble={this.addNewMsg} userBubble={this.userChanger} />
        </footer>
      </div>
    )
  }
}
export default App
