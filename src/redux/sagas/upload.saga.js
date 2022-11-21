import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import FormData from "form-data";

function* uploadImage(action) {
    console.log('uploading image');

    
}

function* uploadSaga() {
    yield takeLatest('UPLOAD_IMAGE', uploadImage);
}

export default uploadSaga;