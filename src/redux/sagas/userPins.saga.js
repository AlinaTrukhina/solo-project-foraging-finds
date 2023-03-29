import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchUserPins() {
  try {
    // request to server to get all pins from database
    const dbResponse = yield axios.get('/mypins');
    // console.log('db response after GET request is:', dbResponse);

    // set reducer to the data we got from database
    yield put({ type: 'SET_USER_PINS', payload: dbResponse.data });

  } catch (error) {
    console.error('Error fetching user pins:', error);
    alert('could not load your pins!');
  }
}

// add pin
function* addPin(action) {
  try {
    yield axios.post('/mypins', action.payload);

    const dbResponse = yield axios.get('/pins');

    // set reducer to the data we got from database
    yield put({ type: 'SET_ALL_PINS', payload: dbResponse.data });    
  } catch (error) {
    console.error('Error adding pin:', error);
    alert('could not add pin!');
  }
}

// add pin image
function* addPinImage(action) {
  try {
    yield axios.post('/mypins/image', action.payload);

    const dbResponse = yield axios.get('/pins');

    // set reducer to the data we got from database
    yield put({ type: 'SET_ALL_PINS', payload: dbResponse.data });    
  } catch (error) {
    console.error('Error adding pin image:', error);
    alert('could not add pin!');
  }
}

// delete a pin
function* deletePin(action) {
  try {
    // console.log('in delete pin saga, pin is', action.payload);
    yield axios.delete(`/mypins`, {data: action.payload});

    yield put({
      type: 'FETCH_PINS'
    });    
    yield put ({type: 'FETCH_USER_PINS'})
  } catch (error) {
    console.error('Error deleting pin:', error);
    alert('could not delete pin!');
  }
}

// edit a pin
function* editPin(action){
  try {
    const pinToEdit = yield axios.get(`/mypins/${action.payload}`);
    console.log('pin to edit is', {pinToEdit});

    yield put ({type: 'SET_EDIT PIN', payload: pinToEdit.data})
  } catch (error) {
    console.error('Error edit pin:', error);
    alert('could not edit pin!');
  }
}

function* saveEditedPin(action){
  try {
    yield axios.put(`/mypins/${action.payload.id}/edit`, action.payload)
    alert('your pin is updated!')
  } catch (error) {
    console.error('Error saving updated pin:', error);
    alert('could not save updated pin!');
  }
}

function* userPinsSaga() {
  yield takeLatest('FETCH_USER_PINS', fetchUserPins);

  yield takeLatest('ADD_PIN', addPin);

  yield takeLatest('ADD_PIN_IMAGE', addPinImage);

  yield takeLatest('DELETE_PIN', deletePin);

  yield takeLatest('FETCH_EDIT_PIN', editPin);

  yield takeLatest('SAVE_PIN', saveEditedPin);
}

export default userPinsSaga;
