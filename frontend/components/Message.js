import React from 'react';
import PropTypes from 'prop-types';


const Message = ({username, content, currentUser, colorHash, updateColorHash}) => {
    // Ranndomly Generate colors and avatars for other users.
    const iconsArr = ["fab fa-btc", "fab fa-ethereum", "fab fa-gg", "fas fa-dollar-sign"];

    const colors = ["#e17055", "#00b894", "#fdcb6e", "#6c5ce7"];
    const userIndex = Math.floor(Math.random() * colors.length);
    const styles = {
        display: 'inline-block'
    };
    if(colorHash.hasOwnProperty(username)) {
        styles.backgroundColor = colorHash[username];
    } else {
        const newColorHash = Object.assign({}, colorHash);
        const usedHash = {};
        const unusedColors = [];
        colors.forEach(color => {
            if(!newColorHash.hasOwnProperty(color)) {
                unusedColors.push(color);
            }
        });
        const newUserIndex = Math.floor(Math.random() * unusedColors.length);
        newColorHash[username] = unusedColors[newUserIndex];
        newColorHash[unusedColors[newUserIndex]] = username;
        updateColorHash(newColorHash);
    }

    if(username === currentUser) {
      // the message is sent by user in browser
        return (
          <p className="message-right">{content}</p>
        );
    }
    return (
      // it's a random user.
      <div className="message-left">
        <span className="span-left" style={styles}>{username}</span>
        <p style={styles}> {content} </p>

      </div>
    );
};

Message.propTypes = {
    username: PropTypes.string,
    content: PropTypes.string,
    currentUser: PropTypes.string,
    colorHash: PropTypes.object,
    updateColorHash: PropTypes.func
};

export default Message;
