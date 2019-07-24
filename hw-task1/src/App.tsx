import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { MainForm } from "./components/Form2/Form";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        FORM VALIDATION
      </header>
      <MainForm />
    </div>
  );
};

export default App;
