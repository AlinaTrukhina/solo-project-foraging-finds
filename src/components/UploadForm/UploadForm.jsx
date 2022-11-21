import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

function UploadForm(){

    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState('');

    return (
        <>
        <form>
          <input type="file" className="form-file-input" 
            onChange={(evt)=>setSelectedFile(evt.target.files)}/>
          <input type="text" className="form-desc-input" name="photo_description" />
          <button type="submit">Add Photo</button>
        </form>
        </>
    )
}

export default UploadForm;