import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function LogOutButton() {
  const dispatch = useDispatch();
  return (
    <p className='navLink' id="logOutButton"
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </p>
  );
}

export default LogOutButton;
