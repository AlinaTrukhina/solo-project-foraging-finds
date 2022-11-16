import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// saga to fetch all comments from database and put them in redux store
function* fetchComments() {
  console.log('in fetch comments');
  try {
    // request to server to get all comments from database
    const dbResponse = yield axios.get('/comments');
    console.log('db response after GET request is:', dbResponse);

    // set reducer to the data we got from database
    yield put({ type: 'SET_ALL_COMMENTS', payload: dbResponse.data });

  } catch (error) {
    console.log('Error fetching comments:', error);
    alert('could not load comments!');
  }
}

function* addComment(action) {
    console.log('in add comment saga');
    try {
      // request to server to get all comments from database
      yield axios.post('/comments', action.payload);

      // Now, fetch the comment list
      const allComments = yield axios.get('/comments');
      console.log('db response after GET request is:');
  
      // set reducer to the data we got from database
      yield put({ type: 'SET_ALL_COMMENTS', payload: allComments.data });
  
    } catch (error) {
      console.log('Error fetching comments:', error);
      alert('could not load comments!');
    }
  }

function* commentsSaga() {
  yield takeLatest('FETCH_COMMENTS', fetchComments);

  yield takeLatest('ADD_COMMENT', addComment);
}

export default commentsSaga;
