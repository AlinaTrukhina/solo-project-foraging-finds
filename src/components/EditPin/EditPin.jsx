import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function EditPin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  console.log('params', params);

  useEffect(() => {
    dispatch({type: 'FETCH_EDIT_PIN', payload: params.id})
  }, [params.id])

  const handleCancel = (evt) => {
    evt.preventDefault();
    history.push('/mypins');
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Edit Pin # {params.id}
      </Typography>
      <Box component="form">
        <TextField 
          fullWidth
          id="titleInput"
          label="Mushroom Name"
          size="small"
        />
        <TextField
          fullWidth
          id="latinNameInput"
          label="Latin Name"
          size="small"
        />
        <TextField
          fullWidth
          id="textEntryInput"
          label="any comments?"
          size="small"
          multiline
        />
        <Button
          onClick={(evt)=>handleCancel(evt)}
          type="button"
          variant="outlined"
          size="small"
          >Cancel
        </Button>
        <Button
          onClick={(evt)=>handleSubmit(evt)}
          type="submit"
          variant="contained"
          size="small"
          >
            Submit
        </Button>
      </Box>
    </>
  )
}

export default EditPin;