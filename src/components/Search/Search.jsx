import React, { useEffect, useState } from "react";
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
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

function Search() {

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  const pins = useSelector(store => store.pins);

  useEffect(() => {
    dispatch({ type: 'SET_PINS', payload: []});
    dispatch({ type: 'RESET_SELECTED_PIN', payload: []});
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchByChange = (evt) => {
    console.log('search by', evt.target.value);
    setSearchBy(evt.target.value);
  }

  const submitSearch = (evt) => {
    evt.preventDefault();

    const searchParams = {
      searchTerm: searchTerm.toLowerCase(),
      searchBy: searchBy
    }
    console.log('search params are', searchParams)
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
      <Card key={pin.id}
        onClick={()=>dispatch({type: 'SET_SELECTED_PIN', payload: pin})}
      >
        <CardHeader 
        title={pin.title} 
        subheader={pin.latin_name}
        // subheader={format(parseISO(pin.date), 'yyyy-MM-dd')}
        />
        <CardMedia sx={{maxWidth: '100px'}}
        component="img"
        image={pin.img_url}
        alt={pin.title} />
        <CardContent>
          <Typography>
            {pin.latin_name}
          </Typography>
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