import React, { useState } from 'react';


function ToneGenerator() {
  const [frequency, setFrequency] = useState(440); // Frecuencia inicial (440 Hz)
  const [isPlaying, setIsPlaying] = useState(false);

  let oscillator = null; // Oscilador de audio

  // Función para comenzar a reproducir el tono
  const startTone = () => {
    if (!isPlaying) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      oscillator = audioContext.createOscillator();
      oscillator.type = 'sine'; // Tipo de forma de onda (sinusoidal)
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.connect(audioContext.destination);
      oscillator.start();
      setIsPlaying(true);
    }
  };

  // Función para detener el tono
  const stopTone = () => {
    if (oscillator !== null && isPlaying) { // Comprobación de que oscillator no sea null
      oscillator.stop();
      setIsPlaying(false);
    }
  };

  // Manejar cambios en la frecuencia
  const handleFrequencyChange = (event) => {
    const newFrequency = parseFloat(event.target.value);
    setFrequency(newFrequency);
    stopTone();
  };

  return (
    <div>
      <h2>Generador de Tono</h2>
      <p>Ingrese la frecuencia (Hz) y haga clic en "Reproducir" para generar el tono:</p>
      <input
        type="number"
        value={frequency}
        onChange={handleFrequencyChange}
        min="20"
        max="2000"
        step="0.1"
      />
      <button onClick={startTone}>Reproducir</button>
      <button onClick={stopTone}>Detener</button>
    

    </div>

    
  );
}
export default ToneGenerator;
