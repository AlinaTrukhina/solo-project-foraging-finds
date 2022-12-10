import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga: will be fired on FETCH_PINS
function* fetchPins() {
  console.log('in fetch pins');
  try {
    // request to server to get all pins from database
    const dbResponse = yield axios.get('/pins');
    console.log('db response after GET request is:', dbResponse);

    // set reducer to the data we got from database
    yield put({ type: 'SET_ALL_PINS', payload: dbResponse.data });

  } catch (error) {
    console.log('Error fetching pins:', error);
    alert('could not load pins!');
  }
}

// Saga: will be fired on FETCH_SELECCTED_PIN
function* fetchSelectedPin(action) {
  console.log('in fetch selected pins');
  try {
    // request to server to get all pins from database
    const dbResponse = yield axios.get(`/pins/${action.payload}`);
    console.log('db response after GET request is:', dbResponse);

    // set reducer to the data we got from database
    yield put({ type: 'SET_SELECTED_PIN', payload: dbResponse.data });

  } catch (error) {
    console.log('Error fetching pin:', error);
    alert('could not load selected pin!');
  }
}

function* pinsSaga() {
  yield takeLatest('FETCH_PINS', fetchPins);

  yield takeLatest('FETCH_SELECTED_PIN', fetchSelectedPin);
}

export default pinsSaga;
