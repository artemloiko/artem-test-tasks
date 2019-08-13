import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './PhotoResult.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: 320
  }
}));

export default function PhotoResult(props) {
  const { imageFile, handleStepChange } = props;
  const classes = useStyles();
  return (
    <div className="PhotoResult">
      <img className="PhotoResult__image" src={URL.createObjectURL(imageFile)} alt={imageFile.name} />
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
  imageFile: PropTypes.object,
  handleStepChange: PropTypes.func
};
