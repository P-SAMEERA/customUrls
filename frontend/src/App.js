import React, { Component } from 'react';
import './App.css';
import InputUrl from './InputUrl';
import BackgroundAnimate from './BackgroundAnimate';
// import ResultLink from './ResultLink';
class App extends Component {
  render() {
    return (
      <div className="container">
        <InputUrl/>
        <BackgroundAnimate/>
        {/* <ResultLink/> */}
      </div>
    );
  }
}

export default App;
