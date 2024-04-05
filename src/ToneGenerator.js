import React, { useState, useRef, useEffect} from 'react';


const frequencyList = {
  'C0': 16.35,
  'C#0': 17.32,
  'D0': 18.35,
  'D#0': 19.45,
  'E0': 20.60,
  'F0': 21.83,
  'F#0': 23.12,
  'G0': 24.50,
  'G#0': 25.96,
  'A0': 27.50,
  'A#0': 29.14,
  'B0': 30.87,
  'C1': 32.70,
  'C#1': 34.65,
  'D1': 36.71,
  'D#1': 38.89,
  'E1': 41.20,
  'F1': 43.65,
  'F#1': 46.25,
  'G1': 49.00,
  'G#1': 51.91,
  'A1': 55.00,
  'A#1': 58.27,
  'B1': 61.74,
  'C2': 65.41,
  'C#2': 69.30,
  'D2': 73.42,
  'D#2': 77.78,
  'E2': 82.41,
  'F2': 87.31,
  'F#2': 92.50,
  'G2': 98.00,
  'G#2': 103.83,
  'A2': 110.00,
  'A#2': 116.54,
  'B2': 123.47,
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
  'C#6': 1108.73,
  'D6': 1174.66,
  'D#6': 1244.51,
  'E6': 1318.51,
  'F6': 1396.91,
  'F#6': 1479.98,
  'G6': 1567.98,
  'G#6': 1661.22,
  'A6': 1760.00,
  'A#6': 1864.66,
  'B6': 1975.53,
  'C7': 2093.00,
  'C#7': 2217.46,
  'D7': 2349.32,
  'D#7': 2489.02,
  'E7': 2637.02,
  'F7': 2793.83,
  'F#7': 2959.96,
  'G7': 3135.96,
  'G#7': 3322.44,
  'A7': 3520.00,
  'A#7': 3729.31,
  'B7': 3951.07,
  'C8': 4186.01,
  'C#8': 4434.92,
  'D8': 4698.63,
  'D#8': 4978.03,
  'E8': 5274.04,
  'F8': 5587.65,
  'F#8': 5919.91,
  'G8': 6271.93,
  'G#8': 6644.88,
  'A8': 7040.00,
  'A#8': 7458.62,
  'B8': 7902.13,
  'C9': 8372.02,
  'C#9': 8869.84,
  'D9': 9397.27,
  'D#9': 9956.06,
  'E9': 10548.08,
  'F9': 11175.30,
  'F#9': 11839.82,
  'G9': 12543.85,
  'G#9': 13289.75,
  'A9': 14080.00,
  'A#9': 14917.24,
  'B9': 15804.26,
  'C10': 16744.04,
};



const getNoteAndFrequency = (frecuencia) => {
  let frecuenciaMasCercana = null;
  let notaMasCercana = null;
  let distanciaMinima = Infinity;

  for (const [nota, freq] of Object.entries(frequencyList)) {
    const distancia = Math.abs(frecuencia - freq);
    if (distancia < distanciaMinima || (distancia === distanciaMinima && nota === 'A')) {
      frecuenciaMasCercana = freq;
      notaMasCercana = nota;
      distanciaMinima = distancia;
    }
  }

  return { nota: notaMasCercana, frecuencia: frecuenciaMasCercana };
};

const NoteFrequencyList = ({ frequencyList }) => {
  return (
    <div>
      <h3>Lista de Notas y Frecuencias</h3>
      <ul>
        {Object.entries(frequencyList).map(([note, frequency]) => (
          <li key={note}>{`${note}: ${frequency} Hz`}</li>
        ))}
      </ul>
    </div>
  );
};


function ToneGenerator() {
  const [frequencies, setFrequencies] = useState({
    tonic: 0,
    third: 0,
    fifth: 0,
    seventh: 0,
    subBass: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState('sine');
  const [activeNotes, setActiveNotes] = useState({
    tonic: null,
    third: null,
    fifth: null,
    seventh: null,
    subBass: null,
  });
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef({});

  useEffect(() => {
    if (isPlaying) {
      Object.entries(oscillatorsRef.current).forEach(([key, oscillator]) => {
        oscillator.frequency.setValueAtTime(frequencies[key], audioContextRef.current.currentTime);
      });
    }
  }, [frequencies, isPlaying]);

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
    checkNoteForFrequency(newFrequency, tone);
    stopTones();
  };

  const checkNoteForFrequency = (frequency, tone) => {
    const { note } = getNoteAndFrequency(frequency);
    setActiveNotes(prevActiveNotes => ({
      ...prevActiveNotes,
      [tone]: note,
    }));
  };

  const handleWaveformChange = (event) => {
    const newWaveform = event.target.value;
    setWaveform(newWaveform);
    stopTones();
  };
  return (
    <div>
      <div>
      
        <div>
          {Object.entries(frequencies).map(([tone, frequency]) => (
            <div key={tone}>
              <span>{tone}:</span>
              <input
                type="number"
                min="20"
                max="20000"
                step="1"
                value={frequency}
                onChange={(event) => handleFrequencyChange(event, tone)}
              />
              <select value={frequency} onChange={(event) => handleFrequencyChange(event, tone)}>
                {Object.entries(frequencyList).map(([note, freq]) => (
                  <option key={note} value={freq}>
                    {`${note}: ${freq} Hz`}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div>
          <span>Waveform:</span>
          <select value={waveform} onChange={handleWaveformChange}>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>
        <button onClick={isPlaying ? stopTones : startTones}>
          {isPlaying ? 'Stop' : 'Start'} Tones
        </button>
      </div>

    </div>
  );


    


  
}

export default ToneGenerator;

