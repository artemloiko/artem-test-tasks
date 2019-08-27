import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Icon from '@material-ui/core/Icon';

import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';

import './PhotoCrop.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: 0,
    width: 140
  },
  icon: {
    margin: theme.spacing(1)
  }
}));

export default function PhotoCrop(props) {
  const classes = useStyles();

  const { imageObj, handleStepChange, handleCroppedImage } = props;

  const { dimensions, imageUrl, imageType } = imageObj;

  // const minZoom = 1;
  const minZoom = Math.max(dimensions.width, dimensions.height) / Math.min(dimensions.width, dimensions.height);
  const maxZoomCoef = Math.min(2, Math.min(dimensions.width, dimensions.height) / 300);
  const maxZoom = minZoom * maxZoomCoef;
  const zoomStep = (maxZoom - minZoom) / 10;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(minZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({});
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onZoomChange = zoom => {
    setZoom(zoom);
  };

  const handleCropImage = async () => {
    console.log('handle crop', imageObj);
    const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, imageType);
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
      <div className="PhotoCrop__Cropper ">
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
      <div className="row">
        <Icon
          className={classes.icon}
          color={zoom.toFixed(2) === minZoom.toFixed(2) ? 'disabled' : 'secondary'}
          style={{
            cursor: zoom.toFixed(2) === minZoom.toFixed(2) ? 'default' : 'pointer'
          }}
          onClick={() => {
            zoom.toFixed(2) > minZoom.toFixed(2) &&
              setZoom((zoom - zoomStep).toFixed(2) < minZoom ? minZoom : zoom - zoomStep);
          }}
          disabled={true}
        >
          remove_circle
        </Icon>
        <Slider
          aria-labelledby="Image zoom"
          value={zoom}
          min={minZoom}
          max={maxZoom}
          step={zoomStep}
          onChange={(e, zoom) => {
            setZoom(zoom);
          }}
        />
        <Icon
          className={classes.icon}
          color={zoom.toFixed(2) === maxZoom.toFixed(2) ? 'disabled' : 'secondary'}
          style={{
            cursor: zoom.toFixed(2) === maxZoom.toFixed(2) ? 'default' : 'pointer'
          }}
          onClick={() => {
            console.log('zoom', zoom, maxZoom);
            zoom.toFixed(2) < maxZoom.toFixed(2) &&
              setZoom((zoom + zoomStep).toFixed(2) > maxZoom ? maxZoom : zoom + zoomStep);
          }}
        >
          add_circle
        </Icon>
      </div>

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
