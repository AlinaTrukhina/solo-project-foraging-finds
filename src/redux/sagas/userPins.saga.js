import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchUserPins() {
  console.log('in fetch pins');
  try {
    // request to server to get all pins from database
    const dbResponse = yield axios.get('/mypins');
    console.log('db response after GET request is:', dbResponse);

    // set reducer to the data we got from database
    yield put({ type: 'SET_USER_PINS', payload: dbResponse.data });

  } catch (error) {
    console.log('Error fetching user pins:', error);
    alert('could not load your pins!');
  }
}

function* userPinsSaga() {
  yield takeLatest('FETCH_USER_PINS', fetchUserPins);

}

export default userPinsSaga;
