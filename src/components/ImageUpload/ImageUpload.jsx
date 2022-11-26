import React from 'react';

function ImageUpload() {
  return (
    <>
      <form method='post' encType='multipart/form-data'>
      <input type="file" name="mushroomImage" />
      </form>
    </>
  );
}

export default ImageUpload;