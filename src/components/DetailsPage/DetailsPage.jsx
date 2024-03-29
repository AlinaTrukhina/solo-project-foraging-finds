import React, { useEffect, useState } from 'react';
import { useHistory, useParams, HashRouter as Router, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

import { Container } from '@mui/system';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/system';

function DetailsPage() {
  // declare hooks here
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [commentInput, setCommentInput] = useState('');

  // react hooks
  // TODO: prevent page errors on reload
  useEffect(()=> {
    dispatch({type: 'FETCH_SELECTED_PIN', payload: params.id})

    dispatch({
      type: 'FETCH_PIN_COMMENTS',
      payload: params.id
    })
  }, [params.id]);

  
  const selectedPin = useSelector(store => store.selectedPin);
  const user = useSelector(store => store.user);
  const comments = useSelector(store => store.comments);

  const handleCommentChange = (evt) => {
    setCommentInput(evt.target.value);
  };

  const closeDetails = (evt) => {
    evt.preventDefault();
    dispatch({type: 'SET_SELECTED_PIN', payload: {}});
    history.goBack();
  }

  const addComment = (evt) => {
    evt.preventDefault();
    // build object to send
    const newComment = {
      comment: commentInput,
      date: new Date().toISOString(),
      user_id: user.id,
      pin_id: params.id
    }

    dispatch({
      type: 'ADD_COMMENT',
      payload: newComment
    });

    setCommentInput('');
  }

  return (
    <>
    <Container sx={{margin: '80px 0 40px 0', overflow: 'hidden'}}>
    <Box textAlign='center' marginBottom='10px'>
      <Button 
        onClick={(evt)=>{closeDetails(evt)}}
        variant="outlined"
        size="small"
      >
        Close Details
      </Button>
    </Box>
      <section>
        
        <Typography component="h2" variant="h5" marginTop="10px">
          {selectedPin.title}
        </Typography>
        <Typography component="h3" variant="h6">
          {selectedPin.latin_name}
        </Typography>
        {/* <h4>{format(parseISO(selectedPin.date), 'yyyy-MM-dd')}</h4> */}
        <img src={selectedPin.img_url} alt={selectedPin.title}/>
        <Typography component="h4" variant="h7">Description: </Typography>
        <Typography paragraph>{selectedPin.text_entry}</Typography>
      </section>
      <Typography component="h3" variant="h6" marginBottom="5px">
        Comments
      </Typography>
      <section id="commentSection" 
      style={{display: 'flex', flexDirection: 'column', alignContent: 'space-around'
        }}>
        {comments.map(comment => (
          <Card key={comment.comment_id}>
            <CardHeader
              avatar={
                <Avatar aria-label="userAvatar" src={comment.avatar} sx={{ width: 30, height: 30 }}>
                </Avatar>}
              title={comment.username}
              subheader={format(parseISO(comment.date), 'yyyy-MM-dd')}
            />
            <CardContent>
              <Typography variant="body" color="text.secondary">
                {comment.comment}
              </Typography>
            </CardContent>
          </Card>
          ))}
      </section>
      <form id='addCommentform' action='post'
      onSubmit={addComment}>
      { user.id ?
        <TextField 
          sx={{width: '60%'}}
          value={commentInput}
          onChange={handleCommentChange}
          id='commentInputTextarea' 
          name='comment' 
          label='Add comment'
          multiline
          >
        </TextField>
          :
        <TextField 
          sx={{width: '60%'}}
          value={commentInput}
          id='commentInputTextarea' 
          name='comment' 
          label='Add comment'
          width='50%'
          multiline
          disabled
          >
        </TextField>
      }
      {/* conditional rendering depending on whether user is logged in */}
      { user.id ? 
      <Button onClick={addComment} variant="contained">Add comment</Button>
      : 
      <h5 className='loginMessage'>        
        <Router>
          <Link to="/login"
          >Log In</Link>
        </Router> to add comment
      </h5>
      }
      </form>
    </Container>
    </>
  );
}

export default DetailsPage;