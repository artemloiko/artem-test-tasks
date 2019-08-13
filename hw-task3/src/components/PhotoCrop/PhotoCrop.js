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

  const { image } = props;

  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    console.log('slider value', newValue);
    setValue(newValue);
  };

  return (
    <div className="PhotoCrop">
      <div className="PhotoCrop__wrap">
        <img className="PhotoCrop__image" src={image} alt="Select it on your computer" />
      </div>
      <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
      <div className="row">
        <Button variant="contained" color="primary" component="span" className={classes.button}>
          Change
        </Button>
        <Button variant="contained" color="primary" component="span" className={classes.button}>
          Apply
        </Button>
      </div>
    </div>
  );
}

PhotoCrop.propTypes = { imageFile: PropTypes.object, handleStepChange: PropTypes.func };
