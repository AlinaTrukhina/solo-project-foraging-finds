import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

function UserPage() {
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  return (
    <>
    <h1 className='welcomeMessage'>Welcome, {user.username}!</h1>  
    <div className='avatarConatainer'>
      <p>Your avatar: </p>
      <img className='userAvatar' src={user.avatar} />
    </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;