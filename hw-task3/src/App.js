import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import PhotoUpload from './components/PhotoUpload/PhotoUpload';
import PhotoCrop from './components/PhotoCrop/PhotoCrop';
import PhotoResult from './components/PhotoResult/PhotoResult';

function App() {
  let [step, setStep] = useState('photoUpload');
  let [imageFile, setImageFile] = useState();

  const handleFileUpload = imageFile => {
    setImageFile(imageFile);
    setStep('photoCrop');
  };

  const handleStepChange = stepName => {
    setStep(stepName);
  };

  const handleFileChange = imageFile => {
    setImageFile(imageFile);
    setStep('photoResult');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Task 3.
      </header>
      {step === 'photoUpload' && <PhotoUpload handleFileUpload={handleFileUpload} />}
      {step === 'photoCrop' && (
        <PhotoCrop imageFile={imageFile} handleStepChange={handleStepChange} handleFileChange={handleFileChange} />
      )}
      {step === 'photoResult' && <PhotoResult imageFile={imageFile} handleStepChange={handleStepChange} />}
      <footer className="App-footer">&copy; Artem Loiko, 2019</footer>
    </div>
  );
}

export default App;
