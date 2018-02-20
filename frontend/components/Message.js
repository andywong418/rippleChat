import React from 'react';
import PropTypes from 'prop-types';


const Message = ({username, content, currentUser}) => {
    // Ranndomly Generate colors and avatars for other users.
    const iconsArr = ["fab fa-btc", "fab fa-ethereum", "fab fa-gg", "fas fa-dollar-sign"];
    const userIndex = parseInt(username.split(' ')[1], 10);
    const colors = ["#e17055", "#00b894", "#fdcb6e", "#6c5ce7"];
    const styles = {
        display: 'inline-block'
    };
    styles.backgroundColor = colors[userIndex];
    if(username === currentUser) {
      // the message is sent by user in browser
        return (
          <p className="message-right">{content}</p>
        );
    }
    return (
      // it's a random user.
      <div className="message-left">
        <span className="span-left" style={styles}><i className={iconsArr[userIndex]} /></span>
        <p style={styles}> {content} </p>

      </div>
    );
};

Message.propTypes = {
    username: PropTypes.string,
    content: PropTypes.string,
    currentUser: PropTypes.string
};

export default Message;
