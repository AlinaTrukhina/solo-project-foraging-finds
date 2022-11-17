import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Search() {
  const [searchBy, setsearchBy] = useState('');

  const handleSelect = (event) => {
    setsearchBy(event.target.value);
  };

  return (
    <>
      <Typography>Search</Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
      <TextField
        size="small"
        fullWidth
        required
        id="searchInput"
        label="Search term"
        name="searchterm"
        autoFocus
            />
      <FormControl sx={{ marginTop: 1, width: '100vw' }} size='small'>
        <InputLabel id="selectSearchBy">Search By</InputLabel>
        <Select
          fullWidth
          labelId="selectSearchBy"
          id="SearchBySelect"
          value={searchBy}
          label="Search By"
          onChange={handleSelect}
        >
          <MenuItem value={'title'}>Mushroom Name</MenuItem>
          <MenuItem value={'latin-name'}>Latin Name</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Search
      </Button>
      </Box>
    </>
  )
}

export default Search;