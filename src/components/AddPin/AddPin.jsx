import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import axios from "axios";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import UploadForm from "../UploadForm/UploadForm";
import newImage from "../../redux/reducers/newImage.reducer";

import scrollToTop from './/..//helpers';


function AddPin() {

  const history = useHistory();
  const dispatch = useDispatch();

  // store inputs in state
  const [titleInput, setNewTitle] = useState('');
  const [latinNameInput, setLatinName] = useState('');
  const [textEntryInput, setTextInput] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const imgInput = useSelector(store => store.newImage);

  const handleCancel = (evt) => {
    evt.preventDefault();
    history.push('/');
  }

  const handleOpen = () => {
    setDialogOpen(true);
  };
  // close the dialog
  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleTitleChange = (evt) => {
    setNewTitle(evt.target.value);
  };

  const handleLatinChange = (evt) => {
    setLatinName(evt.target.value);
  };

  // const handleUrlChange = (evt) => {
  //   setUrl(evt.target.value);
  // };

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
        // console.log('userP', userP);
        resolve(userP);
      }, reject);
    });  
  }

  // add pin to database
  // date is today's date
  // coordinates are from user position
  async function addPin(evt) {
    evt.preventDefault;
    scrollToTop();
    if (titleInput === '') {
      alert('Please fill in title!');
      return;
    }
    try {
      setLoading(true);
      const userP =  await getUserPosition();

      const newImage = await axios.get('/upload');
      const newImageId = newImage.data.id;
      const newPin = {
      title: titleInput,
      latin_name: latinNameInput,
      date: new Date().toISOString(),
      img_id: newImageId,
      // img_url: newImage.url,
      text_entry: textEntryInput,
      lat: userP.lat,
      lng: userP.lng
      } 

      // console.log('newPin:', newPin);
      await dispatch({
        type: 'ADD_PIN',
        payload: newPin
      })

      setLoading(false);
      alert('Added pin!');

      dispatch({ type: 'RESET_NEW_IMAGE'});

      setNewTitle('');
      setLatinName('');
      setTextInput('');
    } catch (error) {
      console.error('addPin error is', error);
      alert('error uploading image', error);
    }
  }

  return (
    <>
    <div data-testid='add-pin-test'>
    <Container sx={{margin: '80px 0 40px 0'}}>
      <Typography component="h1" variant="h5" align='center' marginBottom='10px'>
        Add Pin
      </Typography>
      <Box component="form" 
      // onSubmit={(evt)=>disable(evt)}
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
          fullWidth
          id="latinNameInput"
          label="Latin Name"
          size="small"
        />  
        <Button variant="outlined" size="small"
        onClick={handleOpen} sx={{marginBottom:"10px"}}>
          Upload Your Photo
        </Button>
        <Dialog open={dialogOpen} onClose={handleClose}>
          <UploadForm />
          <Button onClick={handleClose}>
            Done
          </Button>
        </Dialog>
        {/* <img src={imgInput.img_url} /> */}
        <p>{imgInput.img_url}</p>
        <img src={imgInput.img_url} alt="" />
        <TextField onChange={handleTextInputChange}
          value={textEntryInput}
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
          <LoadingButton
            onClick={addPin}
            type="submit"
            variant="contained"
            size="small"
            loading={loading}
            >
              Submit
          </LoadingButton>
        </Stack>
      </Box>
    </Container>
    </div>
    </>
  );
}

export default AddPin;