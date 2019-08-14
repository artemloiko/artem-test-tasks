import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

import { imageValidation } from '../../utils/validations';

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

export default function PhotoUpload(props) {
  let fileRef = useRef();
  const classes = useStyles();
  const [error, setError] = useState('');

  const { handleFileUpload } = props;

  const onFileInputChange = event => {
    const file = fileRef.current.files[0];
    if (!file) {
      setError('');
      return;
    }
    console.log('check image', file);
    imageValidation(file)
      .then(() => {
        console.log('image is fine', file);
        handleFileUpload(fileRef.current.files[0]);
      })
      .catch(error => {
        console.log('set error', error);
        setError(error);
      });
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
      <FormHelperText error={Boolean(error)}>{error || 'Minimum size 300x300 jpeg jpg png 5 MB'}</FormHelperText>
    </div>
  );
}

PhotoUpload.propTypes = {
  handleFileUpload: PropTypes.func
};
