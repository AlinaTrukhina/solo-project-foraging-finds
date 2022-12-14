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
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

function Search() {

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  const pins = useSelector(store => store.pins);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchByChange = (evt) => {
    setSearchBy(evt.target.value);
  }

  const submitSearch = (evt) => {
    evt.preventDefault();

    const searchParams = {
      searchTerm: searchTerm.toLowerCase(),
      searchBy: searchBy
    }
    dispatch({
      type: 'SEARCH_PINS',
      payload: searchParams
    })
  }

  return (
    <>
    <Container sx={{margin: '80px 0 40px 0'}}>
      <Typography component="h1" variant="h5" align="center" marginBottom='10px'>
        Search
      </Typography>
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
      <FormControl sx={{ marginTop: 1, marginBottom: 1, width: '100%'}} size="small">
      <InputLabel id="searchByLabel">Search By</InputLabel>
        <Select labelId="searchByLabel" id="select" value={searchBy}
        onChange={handleSearchByChange} >
          <MenuItem value={"title"}>Name</MenuItem>
          <MenuItem value={"latin_name"}>Latin Name</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
      >
        Search
      </Button>
      </Box>
      {pins[0] ? null : <Typography marginTop="10px" align="center">
        No entries found.
      </Typography>}
      </Container>

      {pins.map(pin => (
      <Card key={pin.id}>
        <CardHeader 
        onClick={()=>dispatch({type: 'SET_SELECTED_PIN', payload: pin})}
        title={pin.title} 
        subheader={pin.latin_name}
        />
        <CardMedia sx={{maxWidth: '100px', marginLeft: '20px'}}
        component="img"
        image={pin.img_url}
        alt={pin.title} />
        <CardContent>
          {/* <Typography>
            {pin.latin_name}
          </Typography> */}
          <Typography paragraph>
            {pin.text_entry}
          </Typography>
        </CardContent>
      </Card>
    ))}
    </>
  )
}

export default Search;