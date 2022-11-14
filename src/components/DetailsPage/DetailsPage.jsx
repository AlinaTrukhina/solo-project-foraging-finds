import React from 'react';
import { useParams } from 'react-router-dom';

function DetailsPage( { selected } ) {
  
  //TODO: figure out how to pass the selected object to DetailsPage

  return (
    <>
      <h1>Details</h1>
      {/* <p>{selected.title}</p> */}
    </>
  );
}

export default DetailsPage;