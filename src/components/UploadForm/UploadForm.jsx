import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

function UploadForm(){

    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState('');

    const uploadImage = (evt) => {
      evt.preventDefault();
      alert('the selected file is', selectedFile);
      dispatch({
        type: 'UPLOAD_IMAGE',
        payload: selectedFile
      })
    }

    return (
        <>
        <form onSubmit={uploadImage}>
          <input type="file" name="uploaded_file"
            className="form-file-input" 
            onChange={(evt)=>setSelectedFile(evt.target.files)}/>
          <input type="text" className="form-desc-input" name="photo_description" />
          <button type="submit">Add Photo</button>
        </form>
        </>
    )
}

export default UploadForm;