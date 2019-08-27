import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PreloaderImage from '../Preloader/PrealoderImage';

import './PhotoResult.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: 300
  }
}));

export default function PhotoResult(props) {
  const { imageObj, handleStepChange } = props;
  const { imageUrl } = imageObj;
  const classes = useStyles();

  return (
    <div className="PhotoResult">
      {imageUrl ? (
        <img className="PhotoResult__image" src={imageUrl} alt="Cropped" style={{ width: '300px' }} />
      ) : (
        <PreloaderImage />
      )}
      <p className="PhotoResult__text">{imageUrl}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleStepChange('photoUpload')}
        className={classes.button}
      >
        Home
      </Button>
    </div>
  );
}

PhotoResult.propTypes = {
  imageObj: PropTypes.object,
  handleStepChange: PropTypes.func
};
