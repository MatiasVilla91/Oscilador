import React, { useState, useRef } from 'react';

const frequencyList = {
  'C': 261.63,
  'C#': 277.18,
  'D': 293.66,
  'D#': 311.13,
  'E': 329.63,
  'F': 349.23,
  'F#': 369.99,
  'G': 392.00,
  'G#': 415.30,
  'A': 440.00,
  'A#': 466.16,
  'B': 493.88,
};

const getNoteAndFrequency = (frequency) => {
  const note = Object.keys(frequencyList).find(note => frequencyList[note] === frequency);
  return { note, frequency };
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
  const [activeSlider, setActiveSlider] = useState(null);
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
    if (activeSlider === tone) {
      const { note, frequency } = getNoteAndFrequency(newFrequency);
      document.getElementById(`${tone}-label`).innerText = `${note} - ${frequency} Hz`;
    }
    stopTones();
  };

  const handleWaveformChange = (event) => {
    const newWaveform = event.target.value;
    setWaveform(newWaveform);
    stopTones();
  };

  const handleSliderFocus = (tone) => {
    setActiveSlider(tone);
  };

  const handleSliderBlur = () => {
    setActiveSlider(null);
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
          onFocus={() => handleSliderFocus('tonic')}
          onBlur={handleSliderBlur}
        />
        <input
          type="number"
          value={frequencies.tonic}
          onChange={(event) => handleFrequencyChange(event, 'tonic')}
          min="20"
          max="20000"
        />
        <span id="tonic-label">{getNoteAndFrequency(frequencies.tonic).note} - {frequencies.tonic} Hz</span>
      </div>
      <div>
        <p>Tercera:</p>
        <input
          type="range"
          value={frequencies.tonic}
          onChange={(event) => handleFrequencyChange(event, 'tonic')}
          min="20"
          max="20000"
          onFocus={() => handleSliderFocus('tonic')}
          onBlur={handleSliderBlur}
        />
        <input
          type="number"
          value={frequencies.tonic}
          onChange={(event) => handleFrequencyChange(event, 'tonic')}
          min="20"
          max="20000"
        />
        <span id="third-label">{getNoteAndFrequency(frequencies.third).note} - {frequencies.third} Hz</span>
      </div>
      <div>
        <p>Quinta:</p>
        <input
          type="range"
          value={frequencies.tonic}
          onChange={(event) => handleFrequencyChange(event, 'tonic')}
          min="20"
          max="20000"
          onFocus={() => handleSliderFocus('tonic')}
          onBlur={handleSliderBlur}
        />
        <input
          type="number"
          value={frequencies.tonic}
          onChange={(event) => handleFrequencyChange(event, 'tonic')}
          min="20"
          max="20000"
        />
        <span id="fifth-label">{getNoteAndFrequency(frequencies.fifth).note} - {frequencies.fifth} Hz</span>
      </div>
      <div>
        <p>Séptima:</p>
        <input
          type="range"
          value={frequencies.tonic}
          onChange={(event) => handleFrequencyChange(event, 'tonic')}
          min="20"
          max="20000"
          onFocus={() => handleSliderFocus('tonic')}
          onBlur={handleSliderBlur}
        />
        <input
          type="number"
          value={frequencies.tonic}
          onChange={(event) => handleFrequencyChange(event, 'tonic')}
          min="20"
          max="20000"
        />
        <span id="seventh-label">{getNoteAndFrequency(frequencies.seventh).note} - {frequencies.seventh} Hz</span>
      </div>
      <div>
        <p>Subbajo:</p>
        <input
          type="range"
          value={frequencies.tonic}
          onChange={(event) => handleFrequencyChange(event, 'tonic')}
          min="20"
          max="20000"
          onFocus={() => handleSliderFocus('tonic')}
          onBlur={handleSliderBlur}
        />
        <input
          type="number"
          value={frequencies.tonic}
          onChange={(event) => handleFrequencyChange(event, 'tonic')}
          min="20"
          max="20000"
        />
        <span id="subBass-label">{getNoteAndFrequency(frequencies.subBass).note} - {frequencies.subBass} Hz</span>
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
