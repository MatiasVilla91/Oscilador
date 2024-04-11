import React, { useState, useRef, useEffect} from 'react';
//import Sequencer from './Sequencer';
import DelayedRender from './delay';
import PedalerasSection from './pedales.js'
import { frequencyList } from './listas-de-frecuencias.js';




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

  // Estados para la secuencia de notas y el tempo
  const [sequence, setSequence] = useState([]);
  const [tempo, setTempo] = useState(120);

  // Función para reproducir la secuencia
  const playSequence = () => {
    // Lógica de reproducción de la secuencia...
  };

  
   //ACA VA LA PARTE QUE VA
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

  <div>

    
    </div>
    {/* <div>
      { Renderiza el componente Sequencer }
      <Sequencer sequence={sequence} setSequence={setSequence} />
    </div> 
    <div>
    <div>
     
      <DelayedRender delay={2000}>
        <p>Gracias por usar mi web</p>
      </DelayedRender>
      <PedalerasSection />
    
    </div>
    </div>
*/}
  </div>

  );
}

export default ToneGenerator;
