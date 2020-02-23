import React from 'react';
import logo from './logo.svg';
import './App.css';
import JoinForm from './containers/JoinForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <JoinForm></JoinForm>
      </header>
    </div>
  );
}

export default App;
