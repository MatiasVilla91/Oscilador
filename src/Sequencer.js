import React, { useState } from 'react';

const Sequencer = () => {
  // Estado para almacenar la secuencia de notas
  const [sequence, setSequence] = useState([]);

  // Función para activar/desactivar una nota en la secuencia
  const toggleNote = (rowIndex, noteIndex) => {
    const newSequence = [...sequence];
    newSequence[rowIndex][noteIndex] = !newSequence[rowIndex][noteIndex];
    setSequence(newSequence);
  };

  
  const chordList = [
    { tonic: 261.63, third: 329.63, fifth: 392, seventh: 493.88, subBass: 130.81 }, // Cmaj7
    { tonic: 293.66, third: 369.99, fifth: 440, seventh: 554.37, subBass: 146.83 }, // Dmaj7
    // Agrega más acordes según lo desees
  ];
  
  // Generar una secuencia inicial (por ejemplo, 8 filas y 16 columnas)
  useState(() => {
    const initialSequence = Array.from({ length: 8 }, () => Array.from({ length: 16 }, () => false));
    setSequence(initialSequence);
  }, []);

  return (
    <div>
      <h3>Sequencer</h3>
      {/* Interfaz de usuario para editar la secuencia de notas */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {sequence.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((note, noteIndex) => (
              <button
                key={noteIndex}
                style={{
                  width: '30px',
                  height: '30px',
                  margin: '2px',
                  backgroundColor: note ? 'blue' : 'white',
                  border: '1px solid black',
                }}
                onClick={() => toggleNote(rowIndex, noteIndex)}
              ></button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sequencer;
