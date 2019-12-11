import React, { Component } from 'react';
import Header from './header';
import Form from './form';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="form-container">
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
