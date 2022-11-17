import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";

function UserPage() {
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  history.push('/info');
  return (
    alert(`Welcome, ${user.username}! Your ID is: ${user.id}`)
    
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
