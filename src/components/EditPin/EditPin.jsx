import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EditPin() {
  const dispatch = useDispatch();
  const params = useParams();
  console.log('params', params);


  useEffect(() => {
    dispatch({type: 'FETCH_EDIT_PIN', payload: params.id})
  }, [params.id])

  return (
    <>
      <h1>Edit Pin # {params.id}</h1>

    </>
  )
}

export default EditPin;