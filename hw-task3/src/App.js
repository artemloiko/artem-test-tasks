import React from 'react';
import logo from './logo.svg';
import './App.css';

import PhotoUpload from './components/PhotoUpload/PhotoUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Task 3.
      </header>
      <PhotoUpload />
      <footer className="App-footer">&copy; Artem Loiko, 2019</footer>
    </div>
  );
}

export default App;
