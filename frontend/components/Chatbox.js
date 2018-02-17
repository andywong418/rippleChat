import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },

};
export default class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        const randomTime = Math.random() * 10000;
        this.generateRandomMessages = this.generateRandomMessages.bind(this);
        this.timeInterval = setTimeout(this.generateRandomMessages, randomTime + 3000);
    }


    generateRandomMessages() {
        clearTimeout(this.timeInterval);
        const fillerText = ["You're so right", "I love lamp", "Lorem Ipsum", "Blockchain Revolution"];
        // Select random Time
        const randomTime = Math.random() * 10000;
        let randomUser = Math.floor(Math.random() * fillerText.length);
        const randomText = fillerText[randomUser];
        randomUser = Math.floor(Math.random() * fillerText.length);
        this.props.addMessage(randomText, 'User ' + randomUser);
        this.scrollToBottom();
        this.timeInterval = setInterval(this.generateRandomMessages, randomTime + 3000);
    }

    scrollToBottom() {
        setTimeout(()=> {this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;}, 15);
    }

    submitHandler(e) {
        e.preventDefault();
        // Check for empty spaces
        if(this.state.message.trim() !== '') {
            this.props.addMessage(this.state.message, this.props.username);
        }
        this.setState({message: ''});
        this.scrollToBottom();
    }

    render() {
        const {messages} = this.props;
        return (
          <div className="chatContainer container">
            <div className="messagesContainer" ref={(el) => {window.bob = this.messagesEnd = el;}}>
              {messages.map((message, index) => {
                  return (
                    <p key={index}>{message.username}: {message.content}</p>
                  );
              })}
            </div>


            <form className="input-form" onSubmit={(e) => this.submitHandler(e)}>
                  <div className="row">
                      <div className="form-group col-lg-10 col-md-9 col-sm-12">
                          <input type="text" name="message" className="message-input form-control" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} />
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