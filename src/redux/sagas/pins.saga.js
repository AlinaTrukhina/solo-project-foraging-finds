import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// worker Saga: will be fired on "REGISTER" actions
function* fetchPins(action) {
  console.log('in fetch pins');
  try {
    // request to server to get all pins from database
    const dbResponse = yield axios.get('/api/pins');
    console.log('db response after GET request is:', dbResponse);
    
    // set reducer to the data we got from database
    yield put({ type: 'SET_PINS', payload: dbResponse.data });

  } catch (error) {
    console.log('Error fetching pins:', error);
    alert('could not load pins!');
  }
}

function* pinsSaga() {
  yield takeLatest('FETCH_PINS', fetchPins);
}

export default pinsSaga;
