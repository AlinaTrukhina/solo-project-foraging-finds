import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function AddPin() {

  const history = useHistory();
  const dispatch = useDispatch();

  // store inputs in state
  const [titleInput, setNewTitle] = useState('');
  const [latinNameInput, setLatinName] = useState('');
  const [imgInput, setUrl] = useState('');
  const [textEntryInput, setTextInput] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [userPosition, setUserPosition] = useState({});


  const handleCancel = (evt) => {
    evt.preventDefault();
    history.push('/info');
  }

  const handleTitleChange = (evt) => {
    setNewTitle(evt.target.value);
  };

  const handleLatinChange = (evt) => {
    setLatinName(evt.target.value);
  };

  const handleUrlChange = (evt) => {
    setUrl(evt.target.value);
  };

  const handleTextInputChange = (evt) => {
    setTextInput(evt.target.value);
  };

  const handlePrivateCheck = (evt) => {
    setIsPrivate(current=>!current);
  };

  function getUserPosition() {
    return new Promise(resolve => {navigator.geolocation.getCurrentPosition(
      (position) => {   
        setUserPosition({lat: position.coords.latitude, lng: position.coords.longitude});
      }, 
      () => null
    )
    resolve(userPosition);
    })
  }

  // add pin to database
  // date is today's date
  // coordinates are from user position
  async function addPin(evt) {
    evt.preventDefault();
    await getUserPosition();
      const newPin = {
      title: titleInput,
      latin_name: latinNameInput,
      date: new Date().toISOString(),
      img_url: imgInput,
      text_entry: textEntryInput,
      lat: userPosition.lat,
      lng: userPosition.lng
      // lat: userLocation.lat
    }
    console.log('new pin is', newPin);

    dispatch({
      type: 'ADD_PIN',
      payload: newPin
    })
  }

  return (
    <Container>
      <Typography component="h1" variant="h5">
        Add Pin
      </Typography>
      <Box component="form" onSubmit={(evt)=>addPin(evt)}>
        <TextField onChange={handleTitleChange}
          value={titleInput}
          required
          fullWidth
          id="titleInput"
          label="Mushroom Name"
          size="small"
          autoFocus
        />
        <TextField onChange={handleLatinChange}
          value={latinNameInput}
          required
          fullWidth
          id="latinNameInput"
          label="Latin Name"
          size="small"
        />
        <TextField onChange={handleUrlChange}
          fullWidth
          id="imgInput"
          label="Image url"
          size="small"
        />
        <TextField onChange={handleTextInputChange}
          fullWidth
          id="textEntryInput"
          label="any comments?"
          size="small"
          multiline
        />
        <FormControlLabel onClick={handlePrivateCheck}
          disabled 
          control={<Checkbox />} 
          label="Private" 
          size="small"
        />
        <Button
          onClick={(evt)=>handleCancel(evt)}
          type="button"
          variant="outlined"
          size="small"
          >Cancel
        </Button>
        <Button
        onClick={(evt)=>addPin(evt)}
          type="submit"
          variant="contained"
          size="small"
          >Submit
        </Button>
      </Box>
    </Container>
  );
}

export default AddPin;