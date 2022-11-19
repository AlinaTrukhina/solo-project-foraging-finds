import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function EditPin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    dispatch({type: 'FETCH_EDIT_PIN', payload: params.id})
  }, [params.id])

  const pinToEdit = useSelector(store => store.pinToEdit);

  const handleCancel = (evt) => {
    evt.preventDefault();
    history.push('/mypins');
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'SAVE_PIN',
      payload: pinToEdit
    })
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Edit Pin # {params.id}
      </Typography>
      {pinToEdit.id && (<Box component="form" onSubmit={(evt)=>handleSubmit(evt)}>
        <TextField 
          value={pinToEdit.title}
          onChange={(evt) => dispatch({
            type: 'UPDATE_PIN',
            payload: {title: evt.target.value}
          })}
          fullWidth
          id="titleInput"
          size="small"
        />
        <TextField
          value={pinToEdit.latin_name}
          onChange={(evt) => dispatch({
            type: 'UPDATE_PIN',
            payload: {latin_name: evt.target.value}
          })}
          fullWidth
          id="latinNameInput"
          size="small"
        />
        <TextField
          value={pinToEdit.text_entry}
          onChange={(evt) => dispatch({
            type: 'UPDATE_PIN',
            payload: {text_entry: evt.target.value}
          })}
          fullWidth
          id="textEntryInput"
          size="small"
          multiline
        />
        <Button
          onClick={(evt)=>handleCancel(evt)}
          type="button"
          variant="outlined"
          size="small"
          >Close
        </Button>
        <Button
          onClick={(evt)=>handleSubmit(evt)}
          type="submit"
          variant="contained"
          size="small"
          >
            Submit
        </Button>
      </Box>)}
    </>
  )
}

export default EditPin;