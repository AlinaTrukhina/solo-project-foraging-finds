import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// saga to fetch all comments from database and put them in redux store
function* fetchComments(action) {
  console.log('in fetch comments');
  try {
    // request to server to get all comments for that pin from database
    const dbResponse = yield axios.get('/comments');
    // console.log('db response after GET request is:', dbResponse);

    // set reducer to the data we got from database
    yield put({ type: 'SET_ALL_COMMENTS', payload: dbResponse.data });

  } catch (error) {
    // console.log('Error fetching comments:', error);
    alert('could not load comments!');
  }
}

// saga to fetch all comments for specific pin from database and put them in redux store
function* fetchPinComments(action) {
    // console.log('in fetch pin comments for pin #', action.payload);
    try {
      // request to server to get all comments for that pin from database
      const dbResponse = yield axios.get(`/comments/${action.payload}`);
      // console.log('db response after GET request is:', dbResponse);
  
      // set reducer to the data we got from database
      yield put({ type: 'SET_ACTIVE_PIN_COMMENTS', payload: dbResponse.data });
  
    } catch (error) {
      // console.log('Error fetching comments:', error);
      alert('could not load comments!');
    }
  }

function* addComment(action) {
    //console.log('in add comment saga');
    const pin_id = action.payload.pin_id;
    try {
      // request to server to get all comments from database
      yield axios.post('/comments', action.payload);

      // Now, fetch the comment list
      const thisPinComments = yield axios.get(`/comments/${pin_id}`);
      // console.log('db response after GET request is:', thisPinComments.data);
  
      // set reducer to the data we got from database
      yield put({ type: 'SET_ACTIVE_PIN_COMMENTS', payload: thisPinComments.data });
  
    } catch (error) {
      // console.log('Error fetching comments:', error);
      alert('could not load comments!');
    }
  }

function* commentsSaga() {
  yield takeLatest('FETCH_COMMENTS', fetchComments);

  yield takeLatest('FETCH_PIN_COMMENTS', fetchPinComments);

  yield takeLatest('ADD_COMMENT', addComment);
}

export default commentsSaga;
