import React, { useState, useRef } from 'react';
const frequencyList = {
    'C3': 130.81,
    'C#3': 138.59,
    'D3': 146.83,
    'D#3': 155.56,
    'E3': 164.81,
    'F3': 174.61,
    'F#3': 185.00,
    'G3': 196.00,
    'G#3': 207.65,
    'A3': 220.00,
    'A#3': 233.08,
    'B3': 246.94,
    'C4': 261.63,
    'C#4': 277.18,
    'D4': 293.66,
    'D#4': 311.13,
    'E4': 329.63,
    'F4': 349.23,
    'F#4': 369.99,
    'G4': 392.00,
    'G#4': 415.30,
    'A4': 440.00,
    'A#4': 466.16,
    'B4': 493.88,
    'C5': 523.25,
    'C#5': 554.37,
    'D5': 587.33,
    'D#5': 622.25,
    'E5': 659.25,
    'F5': 698.46,
    'F#5': 739.99,
    'G5': 783.99,
    'G#5': 830.61,
    'A5': 880.00,
    'A#5': 932.33,
    'B5': 987.77,
    'C6': 1046.50,
  };
  

const getNoteAndFrequency = (frequency) => {
    let closestFrequency = null;
    let closestNote = null;
    let minDistance = Infinity;
  
    for (const [note, freq] of Object.entries(frequencyList)) {
      const distance = Math.abs(frequency - freq);
      if (distance < minDistance || (distance === minDistance && note === 'A')) {
        closestFrequency = freq;
        closestNote = note;
        minDistance = distance;
      }
    }
  
    return { note: closestNote, frequency: closestFrequency };
  };
  
  
function ToneGenerator() {
  const [frequencies, setFrequencies] = useState({
    tonic: 20,
    third: 1000,
    fifth: 5000,
    seventh: 10000,
    subBass: 20,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState('sine');
  const [activeNote, setActiveNote] = useState(null);
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef({});

  const startTones = () => {
    if (!isPlaying) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      Object.entries(frequencies).forEach(([key, value]) => {
        const oscillator = audioContextRef.current.createOscillator();
        oscillator.type = waveform;
        oscillator.frequency.setValueAtTime(value, audioContextRef.current.currentTime);
        oscillator.connect(audioContextRef.current.destination);
        oscillator.start();
        oscillatorsRef.current[key] = oscillator;
      });
      setIsPlaying(true);
    }
  };

  const stopTones = () => {
    if (Object.keys(oscillatorsRef.current).length > 0 && isPlaying) {
      Object.values(oscillatorsRef.current).forEach(oscillator => oscillator.stop());
      setIsPlaying(false);
    }
  };

  const handleFrequencyChange = (event, tone) => {
    const newFrequency = parseFloat(event.target.value);
    setFrequencies(prevFrequencies => ({
      ...prevFrequencies,
      [tone]: newFrequency,
    }));
    checkNoteForFrequency(newFrequency);
    stopTones();
  };

  const checkNoteForFrequency = (frequency) => {
    const { note } = getNoteAndFrequency(frequency);
    setActiveNote(note);
  };

  const handleWaveformChange = (event) => {
    const newWaveform = event.target.value;
    setWaveform(newWaveform);
    stopTones();
  };

  return (
    <div>
      <h2>Generador de Tonos</h2>
      <div>
        <p>Tónica:</p>
        <input
          type="range"
          value={frequencies.tonic}
          onChange={(event) => handleFrequencyChange(event, 'tonic')}
          min="20"
          max="20000"
        />
        <input
          type="number"
          value={frequencies.tonic}
          onChange={(event) => handleFrequencyChange(event, 'tonic')}
          min="20"
          max="20000"
        />
    <span id="tonic-label">{activeNote && `${activeNote} - `}{frequencies.tonic} Hz</span>

      </div>
      <div>
        <p>Tercera:</p>
        <input
          type="range"
          value={frequencies.third}
          onChange={(event) => handleFrequencyChange(event, 'third')}
          min="20"
          max="20000"
        />
        <input
          type="number"
          value={frequencies.third}
          onChange={(event) => handleFrequencyChange(event, 'third')}
          min="20"
          max="20000"
        />
        <span id="third-label">{activeNote && `${activeNote} - `}{frequencies.third} Hz</span>
      </div>
      <div>
        <p>Quinta:</p>
        <input
          type="range"
          value={frequencies.fifth}
          onChange={(event) => handleFrequencyChange(event, 'fifth')}
          min="20"
          max="20000"
        />
        <input
          type="number"
          value={frequencies.fifth}
          onChange={(event) => handleFrequencyChange(event, 'fifth')}
          min="20"
          max="20000"
        />
        <span id="fifth-label">{activeNote && `${activeNote} - `}{frequencies.fifth} Hz</span>
      </div>
      <div>
        <p>Séptima:</p>
        <input
          type="range"
          value={frequencies.seventh}
          onChange={(event) => handleFrequencyChange(event, 'seventh')}
          min="20"
          max="20000"
        />
        <input
          type="number"
          value={frequencies.seventh}
          onChange={(event) => handleFrequencyChange(event, 'seventh')}
          min="20"
          max="20000"
        />
        <span id="seventh-label">{activeNote && `${activeNote} - `}{frequencies.seventh} Hz</span>
      </div>
      <div>
        <p>Subbajo:</p>
        <input
          type="range"
          value={frequencies.subBass}
          onChange={(event) => handleFrequencyChange(event, 'subBass')}
          min="20"
          max="20000"
        />
        <input
          type="number"
          value={frequencies.subBass}
          onChange={(event) => handleFrequencyChange(event, 'subBass')}
          min="20"
          max="20000"
        />
        <span id="subBass-label">{activeNote && `${activeNote} - `}{frequencies.subBass} Hz</span>
      </div>
      <div>
        <p>Forma de onda:</p>
        <select value={waveform} onChange={handleWaveformChange}>
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>
      <button onClick={startTones}>Reproducir</button>
      <button onClick={stopTones}>Detener</button>
    </div>
  );
}

export default ToneGenerator;
