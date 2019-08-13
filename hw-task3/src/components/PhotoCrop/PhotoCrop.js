import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';

import './PhotoCrop.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: 0,
    width: 140
  }
}));

export default function PhotoCrop(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    console.log('slider value', newValue);
    setValue(newValue);
  };

  const { imageFile, handleStepChange, handleFileChange } = props;

  console.log('imageFile', imageFile);

  return (
    <div className="PhotoCrop">
      <div className="PhotoCrop__wrap">
        <img className="PhotoCrop__image" src={URL.createObjectURL(imageFile)} alt={imageFile.name} />
      </div>
      <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
      <div className="row">
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={classes.button}
          onClick={() => handleStepChange('photoUpload')}
        >
          Change
        </Button>
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={classes.button}
          onClick={() => handleFileChange(imageFile)}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}

PhotoCrop.propTypes = {
  imageFile: PropTypes.object,
  handleStepChange: PropTypes.func,
  handleFileChange: PropTypes.func
};
