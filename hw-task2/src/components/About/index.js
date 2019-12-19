import React from 'react';
import Acquaintance from './Acquaintance';
import Relations from './Relations';

export default function About(props) {
  return (
    <React.Fragment>
      <Acquaintance tabIndex={props.tabIndex} />
      <Relations />
    </React.Fragment>
  );
}
