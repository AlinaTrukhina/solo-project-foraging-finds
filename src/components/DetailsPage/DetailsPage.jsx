import React, { useEffect, useState } from 'react';
import { useHistory, useParams,   HashRouter as Router, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

function DetailsPage() {
  // declare hooks here
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // react hooks
  // TODO: prevent page errors on reload
  useEffect(()=> {
    dispatch({type: 'FETCH_SELECTED_PIN', payload: params.id})

    dispatch({
      type: 'FETCH_PIN_COMMENTS',
      payload: params.id
    })
  }, [params.id]);

  //TODO: figure out how to pass the selected object to DetailsPage
  const selectedPin = useSelector(store => store.selectedPin);
  const user = useSelector(store => store.user);
  const comments = useSelector(store => store.comments);

  const closeDetails = (evt) => {
    evt.preventDefault();
    dispatch({type: 'SET_SELECTED_PIN', payload: {}});
    history.push('/');
  }

  const addComment = (evt) => {
    evt.preventDefault();
    // build object to send
    const newComment = {
      comment: evt.target.commentInputTextarea.value,
      date: new Date().toISOString(),
      user_id: user.id,
      pin_id: params.id
    }
    console.log('new comment:', newComment);

    dispatch({
      type: 'ADD_COMMENT',
      payload: newComment
    })
  }

  return (
    <>
      <h1>Details Page</h1>
      <button onClick={(evt)=>{closeDetails(evt)}}>Close Details</button>
      <section>
        <h2>{selectedPin.title}</h2>
        <h3>{selectedPin.latin_name}</h3>
        {/* <h4>{format(parseISO(selectedPin.date), 'yyyy-MM-dd')}</h4> */}
        <img src={selectedPin.img_url} alt={selectedPin.title}/>
        <p>Description: {selectedPin.text_entry}</p>
      </section>
      <h2>Comments</h2>
      <section id="commentSection" style={{display: 'flex', flexDirection: 'column', alignContent: 'space-around'
        }}>
        {comments.map(comment => (
          <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-around', alignItems:'center'}} 
          key={comment.comment_id} > 
            <h5>{comment.username}</h5>
            <h6>{format(parseISO(comment.date), 'yyyy-MM-dd')}</h6>
            <p>{comment.comment}</p>
          </div>))}
      </section>
      <form id='addCommentform' action='post'
        onSubmit={addComment}>
        <label htmlFor='commentInputTextarea'>Add Comment</label>
        { user.id ?
          <textarea 
            id='commentInputTextarea' 
            name='comment' 
            placeholder='add comment'
            rows="5" cols="33"
            >
          </textarea>
           :
          <textarea 
            id='commentInputTextarea' 
            name='comment' 
            placeholder='add comment'
            rows="5" cols="33"
            disabled
            >
          </textarea>
        }
        {/* conditional rendering depending on whether user is logged in */}
        { user.id ? 
        <button>Add comment</button>
        : 
        <h5>        
          <Router>
            <Link to="/login"
            >Log In</Link>
          </Router> In to add comment
        </h5>
        }
      </form>
    </>
  );
}

export default DetailsPage;