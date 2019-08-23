import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import PhotoUpload from './components/PhotoUpload/PhotoUpload';
import PhotoCrop from './components/PhotoCrop/PhotoCrop';
import PhotoResult from './components/PhotoResult/PhotoResult';

import { resizeImage } from './utils/imageService';

function App() {
  let [step, setStep] = useState('photoUpload');
  let [imageObj, setImageObj] = useState({
    imageUrl: '',
    imageType: 'image/jpeg',
    dimensions: {
      width: 0,
      height: 0
    }
  });

  const handleimageObjUpload = imageObj => {
    setImageObj({ ...imageObj });
    setStep('photoCrop');
  };

  const handleStepChange = stepName => {
    setStep(stepName);
  };

  const handleCroppedImage = imageObj => {
    setStep('photoResult');
    setImageObj({ ...imageObj, imageUrl: null });
    const newWidth = 300;
    const newHeight = 300;
    resizeImage(imageObj.imageUrl, imageObj.imageType, { width: newWidth, height: newHeight }).then(resizedImage => {
      setImageObj({
        ...imageObj,
        imageUrl: resizedImage,
        dimensions: {
          width: newWidth,
          height: newHeight
        }
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Task 3
      </header>
      {step === 'photoUpload' && <PhotoUpload handleImageUpload={handleimageObjUpload} />}
      {step === 'photoCrop' && (
        <PhotoCrop imageObj={imageObj} handleStepChange={handleStepChange} handleCroppedImage={handleCroppedImage} />
      )}
      {step === 'photoResult' && <PhotoResult imageObj={imageObj} handleStepChange={handleStepChange} />}
      <footer className="App-footer">&copy; Artem Loiko, 2019</footer>
    </div>
  );
}

export default App;
