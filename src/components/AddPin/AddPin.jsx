import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function AddPin() {
  return (
    <Container>
      <Typography component="h1" variant="h5">
        Add Pin
      </Typography>
      <Box component="form">
        <TextField 
          required
          fullWidth
          id="titleInput"
          label="Mushroom Name"
          size="small"
          autoFocus
        />
        <TextField 
          required
          fullWidth
          id="latinNameInput"
          label="Latin Name"
          size="small"
        />
        <TextField 
          fullWidth
          id="imgInput"
          label="Image url"
          size="small"
        />
        <TextField 
          fullWidth
          id="textEntryInput"
          label="any comments?"
          size="small"
          multiline
        />
        <FormControlLabel 
          disabled 
          control={<Checkbox />} 
          label="Private" 
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="small"
          >Submit
        </Button>
      </Box>
    </Container>
  );
}

export default AddPin;