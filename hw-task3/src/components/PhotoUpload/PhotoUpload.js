import React from 'react';
import uploadImage from './PhotoUpload.png';
import './PhotoUpload.css';

export default function PhotoUpload() {
  return (
    <div className="PhotoUpload">
      <img className="PhotoUpload__image" src={uploadImage} alt="Select it on your computer" />
      <p className="PhotoUpload__text">
        Drag your photo here
        <br />
        or
      </p>
      <input type="file" className="PhotoUpload__button" />
    </div>
  );
}
