import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import FormData from "form-data";

function* uploadImage(action) {
    // console.log('uploading images:', action.payload);

    // make FormData object
    let formData = new FormData();
      // appends the image to the object
        // name must match form input name so that this function can reference it
      formData.append('uploaded_file', action.payload[0]);

    // console.log('formData', formData.entries());

  try {
      // POST route to server
    yield axios.post('/upload', formData, { 
      headers: {
        headers: { "Content-Type" : "multipart/form-data" },
      }
    })
  }
  catch (error) {
    console.error('error posting photo', error);
  }
}

function* uploadSaga() {
    yield takeLatest('UPLOAD_IMAGE', uploadImage);
}

export default uploadSaga;