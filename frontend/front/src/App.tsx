import React from 'react';
import SimpleTimer from './SimpleTimer';
import './App.css';
import SimpleTryTimer from './SimpleTryTimer';
import TimerComponent from './Timer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Timer</h1>
        <TimerComponent/>
        {/* <SimpleTimer /> */}
        {/* <SimpleTryTimer /> */}
      </header>
    </div>
  );
}

export default App;
