import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapComponent from '../MapComponent/MapComponent';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const dispatch = useDispatch();

  const allPins = useSelector(store => store.pins);

  useEffect(() => {
    dispatch({
      type: 'FETCH_PINS'
    })
  }, [])

  return (
    <>
    <div data-testid='infopage-test' className='component' >
      <p>Click on a pin to see details</p>
    </div>
    </>
  );
}

export default InfoPage;
