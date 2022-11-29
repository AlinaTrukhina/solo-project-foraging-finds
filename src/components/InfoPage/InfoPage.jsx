import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapComponent from '../MapComponent/MapComponent';

import Typography from '@mui/material/Typography';

function InfoPage() {
  const dispatch = useDispatch();

  const allPins = useSelector(store => store.pins);

  useEffect(() => {
    dispatch({type: 'FETCH_PINS'})
  }, [])

  return (
    <>
    <div data-testid='infopage-test' className='component' >
      <Typography component="h1" variant="h5" align="center" 
      marginBottom="10px">
        See everyone's foraging finds on the map here
      </Typography>
      <Typography align="center">Click on a pin to see details</Typography>
    </div>
    </>
  );
}

export default InfoPage;
