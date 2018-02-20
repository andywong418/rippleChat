import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Chatbox from '../components/Chatbox';
import {updateUsername, addMessage} from '../actions/index';

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var username = prompt("Please enter a username");
        if(!username) {
            username = prompt("Please enter a username again");
        }
        this.props.updateUsername(username);
    }

    render() {
        return (
            <div>
                <div className="background-screen" />
                <Header username={this.props.username}/>
                <Chatbox messages = {this.props.messages} addMessage={this.props.addMessage} username={this.props.username}/>
            </div>
        );
    }
}

AppContainer.propTypes = {
    name: PropTypes.string,
    username: PropTypes.string,
    updateUsername: PropTypes.func,
    messages: PropTypes.array,
    addMessage: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        messages: state.messageReducer.messages
    };
};

const mapDispatchToProps = (dispatch ) => {
    return {
        updateUsername: (username) => dispatch(updateUsername(username)),
        addMessage: (content, username) =>  dispatch(addMessage(content, username)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
