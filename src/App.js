import logo from './logo.svg';
import './App.css';
import React from 'react';
import ToneGenerator from './ToneGenerator'; // Importa el componente ToneGenerator
import Sequencer from './Sequencer';
import { Howl, Howler } from 'howler'; // Importa Howl y Howler desde howler.js
import ChordGenerator from './Chords';
 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Aquí incluye el componente ToneGenerator */}
        <ChordGenerator/>
        <ToneGenerator />
        

        
      </header>
    </div>
    
  );
}

export default App;
