import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// drop-down list for navigation
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function Nav() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // TODO: research MUI menu as a different nav option

  const handleSearchClick = (evt) => {
    dispatch({ type: 'SET_ALL_PINS', payload: []});
    dispatch({type: 'RESET_SELECTED_PIN'})
    setIsDrawerOpen(false);
  }

  const handleInfoClick = (evt) => {
    dispatch({type: 'FETCH_PINS' });
    setIsDrawerOpen(false);
  }

  return (
    <div className="nav-container" id="landing-page">
    <Drawer 
      anchor="top"
      open={isDrawerOpen}
      // Called when clicking outside the drawer
      onClose={() => setIsDrawerOpen(false)}
    >
      <List className='navList'>
        <ListItem className='navListItem'>
          <Link to='/search' className='navListItemLink' 
          onClick={handleSearchClick} >SEARCH</Link>
        </ListItem>
        <ListItem className='navListItem'>
          <Link to='/addpin'  className='navListItemLink'
          onClick={() => setIsDrawerOpen(false)}>ADD PIN</Link>
        </ListItem>
        <ListItem className='navListItem'>
          <Link to='/mypins' className='navListItemLink'
          onClick={() => setIsDrawerOpen(false)}>MY PINS</Link>
        </ListItem>
        <ListItem className='navListItem'>
          <Link to='/user' className='navListItemLink'
          onClick={() => setIsDrawerOpen(false)}>USER PROFILE</Link>
        </ListItem>
        <ListItem className='navListItem'>
          <Link to='/info' className='navListItemLink'
          onClick={handleInfoClick}>MAP</Link>
        </ListItem>
        <ListItem className='navListItem'>
          <Link to='/about' className='navListItemLink'
          onClick={() => setIsDrawerOpen(false)}>ABOUT</Link>
        </ListItem>
      </List>
      <Button 
        onClick={() => setIsDrawerOpen(false)}
      >
        Close
      </Button>
    </Drawer>
    <div className='navTopContainer'>
    <Button sx={{ color: 'white', height: '60px'}}d
      onClick={() => setIsDrawerOpen(true)}
    >
      Menu
    </Button>
    <Link to="/info" className='navLink'
    onClick={handleInfoClick}>
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
