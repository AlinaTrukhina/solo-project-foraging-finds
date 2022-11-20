import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from "@mui/system";

function Search() {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('');

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const submitSearch = (evt) => {
    evt.preventDefault();

    const searchParams = {
      searchTerm: searchTerm.toLowerCase(),
    }

    dispatch({
      type: 'SEARCH_PINS',
      payload: searchParams
    })
  }

  return (
    <>
    <Container>
      <Typography component="h1" variant="h5" align="center">Search</Typography>
      <Box component="form" onSubmit={(evt)=>submitSearch(evt)}>
      <TextField onChange={handleChange}
        size="small"
        fullWidth
        required
        id="searchTerm"
        label="Search term"
        value={searchTerm}
        autoFocus
      />
      <FormControl sx={{ marginTop: 0.5, marginBottom: 0.5, width: '100%'}} size="small">
      <InputLabel id="searchByLabel">Search By</InputLabel>
        <Select labelId="searchByLabel" id="select" value={searchBy} >
          <MenuItem value="title">Name</MenuItem>
          <MenuItem value="latin-name">Latin Name</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={(evt)=>submitSearch(evt)}
        type="submit"
        fullWidth
        variant="contained"
      >
        Search
      </Button>
      </Box>
      </Container>
    </>
  )
}

export default Search;