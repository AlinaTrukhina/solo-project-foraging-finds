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

  // TODO: research MUI menu as a different nav option

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
          <Link to='/search' onClick={() => setIsDrawerOpen(false)}>Search</Link>
        </ListItem>
        <ListItem>
          <Link to='/addpin' onClick={() => setIsDrawerOpen(false)}>Add Pin</Link>
        </ListItem>
        <ListItem>
          <Link to='/mypins' onClick={() => setIsDrawerOpen(false)}>My Pins</Link>
        </ListItem>
        <ListItem>
          <Link to='/user' onClick={() => setIsDrawerOpen(false)}>My Profile</Link>
        </ListItem>
        <ListItem>
          <Link to='/info' onClick={() => setIsDrawerOpen(false)}>Map</Link>
        </ListItem>
      </List>
      <Button 
        onClick={() => setIsDrawerOpen(false)}
      >
        Close
      </Button>
    </Drawer>
    <div className='navTopContainer'>
    <Button sx={{ color: 'white', height: '60px'}}
      onClick={() => setIsDrawerOpen(true)}
    >
      Menu
    </Button>
    <Link to="/home" className='navLink'>
      <h2 className="nav-title">Foraging Finds</h2>
    </Link>
    <div id='logOutArea'>
    {user.id ? <LogOutButton /> : (
    // If there's no user, show login/registration links
      <Link className="navLink" to="/login">
        <p>Login / </p>
        <p>Register</p> 
      </Link>
    )
    }
    </div>
    </div>
  </div>
  );
}

export default Nav;
