import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

// drop-down list for navigation
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

function Nav() {
  const user = useSelector((store) => store.user);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="nav-container" id="landing-page">
    <Drawer 
      anchor="top"
      open={isDrawerOpen}
      // Called when clicking outside the drawer
      onClose={() => setIsDrawerOpen(false)}
    >
      <List>
        <ListItem>
          <Link to='/search'>Search</Link>
        </ListItem>
        <ListItem>
          <Link to='/addpin'>Add Pin</Link>
        </ListItem>
        <ListItem>
          <Link to='/mypins'>My Pins</Link>
        </ListItem>
        <ListItem>
          <Link to='/user'>My Profile</Link>
        </ListItem>
      </List>
      <Button
        onClick={() => setIsDrawerOpen(false)}
      >
        Close
      </Button>
    </Drawer>

    <Button
      onClick={() => setIsDrawerOpen(true)}
    >
      Hamburger
    </Button>
    <Link to="/home">
      <h2 className="nav-title">Foraging Finds</h2>
    </Link>
    {!user.id && (
    // If there's no user, show login/registration links
      <Link className="navLink" to="/login">
        Login / Register
      </Link>
    )}
  </div>
  );
}

export default Nav;
