import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* searchPins(action) {
console.log('in search pins');
try {
    // request to server to get searched pins from database
  const dbResponse = yield axios.get(`/search`, {
    params: action.payload
  });
  console.log('db response after get request is:', dbResponse);

  // set reducer to the data we got from database
  yield put({ type: 'SET_SEARCHED_PINS', payload: dbResponse.data });

} catch (error) {
  console.log('Error searching for pin:', error);
}
}

function* searchSaga() {
    yield takeLatest('SEARCH_PINS', searchPins);
  }
  
  export default searchSaga;
  