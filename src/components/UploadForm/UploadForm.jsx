import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FormData from "form-data";
import axios from 'axios';

import Button from '@mui/material/Button';

function UploadForm(){

  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState();

    async function uploadImage (evt){
    evt.preventDefault();
    console.log('the selected file is', selectedFile.file[0]);

    let formData = new FormData();
    // appends the image to the object
      // name must match form input name so that this function can reference it
    formData.append('uploaded_file', selectedFile.file[0]);
    console.log('form data is ', formData.entries());

    axios.post('/upload', formData);

    const newImage = await axios.get('/upload');

    console.log('new image is:', newImage);

    dispatch({
      type: 'SET_NEW_IMAGE',
      payload: newImage.data
    })
    alert('Photo added!');
  }

  const handleInput = (evt) => {
    console.log(evt.target.files);
    setSelectedFile({file: evt.target.files});
    console.log(selectedFile);
  }

  return (
    <>
    <form onSubmit={uploadImage} display='flex' flexDirection='column'
      justifyContent='flex-start'
      alignContent='center'
      alignItems='center'
    >
      <h2>Choose Your Photo</h2>
      <input type="file" name="uploaded_file" 
        className="form-file-input" 
        onChange={handleInput}/>
      <button 
      // variant="contained" sx={{color: 'red'}}
      type="submit">Add Photo</button>
    </form>
    </>
  )
}

export default UploadForm;