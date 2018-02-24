import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

export default class Chatbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            websocket: new WebSocket("ws://127.0.0.1:" + location.port + '/'),
            colorHash: {},
        };
        const randomTime = Math.random() * 10000;
        this.generateRandomMessages = this.generateRandomMessages.bind(this);
        // this.timeInterval = setTimeout(this.generateRandomMessages, randomTime + 2000);
    }

    componentDidMount() {
        this.state.websocket.onmessage = (message) => {
            const newMessage = JSON.parse(message.data);
            console.log("WHAT?", newMessage);
            this.props.addMessage(newMessage.message, newMessage.username);
        };
    }

    generateRandomMessages() {
        // Randomly generate messages for random users. Clear and set timeout everytime
        clearTimeout(this.timeInterval);
        const fillerText = ["You're so right", "I love lamp", "Lorem Ipsum", "Blockchain Revolution"];
        // Select random Time
        const randomTime = Math.random() * 10000;
        let randomUser = Math.floor(Math.random() * fillerText.length);
        const randomText = fillerText[randomUser];
        randomUser = Math.floor(Math.random() * fillerText.length);
        this.props.addMessage(randomText, 'User ' + randomUser);
        this.scrollToBottom();
        this.timeInterval = setTimeout(this.generateRandomMessages, randomTime + 2000);
    }

    scrollToBottom() {
        // Set time out so that function to scroll to bottom is in callback queue and is called after redux state update.
        setTimeout(() => {this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;}, 15);
    }

    submitHandler(e) {
        e.preventDefault();
        // Check for empty spaces
        if(this.state.message.trim() !== '') {
            this.state.websocket.send(JSON.stringify({"message": this.state.message, "username": this.props.username}));
        }
        this.setState({message: ''});
        this.scrollToBottom();
    }

    updateColorHash(newObj) {
        this.setState({colorHash: newObj});
    }
    render() {
        const {messages} = this.props;
        return (
          <div className="chat-container container">
              <div className="messages-container">
                  <div className="messages-container-scroll-hide" ref={(el) => {window.bob = this.messagesEnd = el;}}>
                      {messages.map((message, index) => {
                          return (
                              <Message
                              key={index}
                              username={message.username}
                              content={message.content}
                              currentUser={this.props.username}
                              colorHash = {this.state.colorHash}
                              updateColorHash= {(newObj) => this.updateColorHash(newObj)}/>
                          );
                      })}
                  </div>
            </div>
            <form className="input-form" onSubmit={(e) => this.submitHandler(e)}>
                <div className="row">
                    <div className="form-group col-lg-10 col-md-9 col-sm-10">
                        <input
                        type="text"
                        placeholder="Enter message..."
                        name="message"
                        className="message-input form-control"
                        value={this.state.message}
                        onChange={(e) => this.setState({message: e.target.value})} />
                    </div>
                    <div className="form-group col-lg-2 col-md-3 col-md-offset-0">
                        <button type="submit" className="btn btn-info">Send</button>
                    </div>
                </div>
              </form>
          </div>
        );
    }
}

Chatbox.propTypes = {
    messages: PropTypes.array,
    addMessage: PropTypes.func,
    username: PropTypes.string
};
