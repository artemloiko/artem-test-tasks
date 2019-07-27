import React from "react";
import logo from "./logo.svg";
import "./App.css";

import MyForm from "./components/Form/Form";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        FORM VALIDATION
      </header>
      <hr />
      <MyForm />
    </div>
  );
};

export default App;
