import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';

import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';

import './PhotoCrop.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: 0,
    width: 140
  }
}));

export default function PhotoCrop(props) {
  const classes = useStyles();

  const { imageObj, handleStepChange, handleCroppedImage } = props;

  const { dimensions, imageUrl } = imageObj;
  const minZoom = Math.max(dimensions.width, dimensions.height) / Math.min(dimensions.width, dimensions.height);
  const maxZoom = 2;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(minZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({});
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onZoomChange = zoom => {
    console.log('zoom change', zoom);
    setZoom(zoom);
  };

  const handleCropImage = async () => {
    console.log('handle crop', imageObj);
    const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
    console.log('croppedImage', croppedImage);
    handleCroppedImage({
      imageUrl: croppedImage,
      dimensions: {
        width: croppedAreaPixels.width,
        height: croppedAreaPixels.height
      }
    });
  };

  return (
    <div className="PhotoCrop">
      <div className="PhotoCrop__wrap">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
          showGrid={false}
          minZoom={minZoom}
          maxZoom={maxZoom}
          cropSize={{
            width: 300,
            height: 300
          }}
        />
      </div>
      <Slider
        aria-labelledby="Image zoom"
        value={zoom}
        min={minZoom}
        max={maxZoom}
        step={(maxZoom - minZoom) / 10}
        onChange={(e, zoom) => {
          console.log('zoom in slider', zoom);
          setZoom(zoom);
        }}
      />
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
          onClick={handleCropImage}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}

PhotoCrop.propTypes = {
  imageObj: PropTypes.object,
  handleStepChange: PropTypes.func,
  handleCroppedImage: PropTypes.func
};
