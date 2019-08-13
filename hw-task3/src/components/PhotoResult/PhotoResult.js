import React from 'react';

export default function PhotoResult(props) {
  const { image } = props;
  return (
    <div className="PhotoResult">
      <img className="PhotoResult__image" src={image} alt={image.name} />
    </div>
  );
}
