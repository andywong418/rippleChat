import React from 'react';
import PropTypes from 'prop-types';

const Header = ({username}) => {
  
    return (
      <div className="header">
        <div>
          <img className = "headerImg" src="https://www.cryptosaurus.cc/ctrl/wp-content/uploads/RIPPLE.png" width={100}/>
          <h1>Ripple Chat</h1>
        </div>
        {username ? <p>You are logged in as {username}</p> : <p />}
      </div>
    );
};

Header.propTypes = {
    username: PropTypes.string,
};

export default Header;
