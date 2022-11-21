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

// add a pin
function* addPin(action) {
  try {
    yield axios.post('/pins', action.payload);

    const dbResponse = yield axios.get('/pins');

    // set reducer to the data we got from database
    yield put({ type: 'SET_ALL_PINS', payload: dbResponse.data });    
  } catch (error) {
    console.log('Error adding pin:', error);
    alert('could not add pin!');
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

  yield takeLatest('ADD_PIN', addPin);

  yield takeLatest('FETCH_SELECTED_PIN', fetchSelectedPin);
}

export default pinsSaga;
