import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import UploadForm from "../UploadForm/UploadForm";

function AddPin() {

  const history = useHistory();
  const dispatch = useDispatch();

  // store inputs in state
  const [titleInput, setNewTitle] = useState('');
  const [latinNameInput, setLatinName] = useState('');
  const [imgInput, setUrl] = useState('');
  const [textEntryInput, setTextInput] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  // const [userPosition, setUserPosition] = useState({});

  const handleCancel = (evt) => {
    evt.preventDefault();
    history.push('/');
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

  // get user position
  async function getUserPosition() {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition((position) => {
        const userP = {lat: position.coords.latitude, lng: position.coords.longitude}
        console.log('userP', userP);
        resolve(userP);
      }, reject);
    });  
  }

  // add pin to database
  // date is today's date
  // coordinates are from user position
  async function addPin(evt) {
    evt.preventDefault;
    try {
      const userP =  await getUserPosition();
      
      const newPin = {
      title: titleInput,
      latin_name: latinNameInput,
      date: new Date().toISOString(),
      img_url: imgInput,
      text_entry: textEntryInput,
      lat: userP.lat,
      lng: userP.lng
      }

      console.log('newPin:', newPin);
      // console.log('userP is ', userP);

      dispatch({
        type: 'ADD_PIN',
        payload: newPin
      })

      alert('Pin added!')
    } catch (error) {
      console.error('addPin error is', error);
    }
  }

  return (
    <>
    <div data-testid='add-pin-test'>
    <Container >
      <Typography component="h1" variant="h5" align='center'>
        Add Pin
      </Typography>
      <Box component="form" onSubmit={(evt)=>addPin(evt)}
      sx={{
        '& .MuiTextField-root': { marginBottom: 1},
      }}>
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
        <FormControlLabel 
          onClick={handlePrivateCheck}
          disabled 
          control={<Checkbox />} 
          label="Make Pin Private?" 
          size="small"
        />
        
        <Stack direction='row' justifyContent="space-evenly">
          <Button
            onClick={(evt)=>handleCancel(evt)}
            type="button"
            variant="outlined"
            size="small"
            >Cancel
          </Button>
          <Button
            // onClick={addPin}
            type="submit"
            variant="contained"
            size="small"
            >
              Submit
          </Button>
        </Stack>
      </Box>
    </Container>
    <UploadForm />
    </div>
    </>
  );
}

export default AddPin;