import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import uploadImage from './PhotoUpload.png';
import './PhotoUpload.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: 320
  },
  input: {
    display: 'none'
  }
}));

export default function PhotoUpload() {
  let [imageFile, setImageFile] = useState();
  let fileRef = useRef();
  const classes = useStyles();

  const onFileInputChange = event => {
    console.log('event on file input', event);
    console.log('ref is', fileRef.current.files);
    setImageFile(fileRef.current.files[0]);
  };

  return (
    <div className="PhotoUpload">
      <img className="PhotoUpload__image" src={uploadImage} alt="Select it on your computer" />
      <p className="PhotoUpload__text">
        Drag your photo here
        <br />
        or
      </p>
      <label htmlFor="fileUpload">
        <Button variant="contained" color="primary" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
      <input
        ref={fileRef}
        className={classes.input}
        accept="image/*"
        id="fileUpload"
        type="file"
        onChange={onFileInputChange}
      />
      {imageFile && (
        <>
          <p>Image info: </p>
          <ol>
            <li>Name: {imageFile.name}</li>
            <li>Size: {imageFile.size}</li>
            <li>Type: {imageFile.type}</li>
          </ol>
          <img src={URL.createObjectURL(imageFile)} alt={imageFile.name} className="PhotoUpload__preview" />
        </>
      )}
    </div>
  );
}
