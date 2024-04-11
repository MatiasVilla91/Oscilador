import React from 'react';
import { frequencyList } from './listas-de-frecuencias'; 

class ChordGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notaRaiz: 'C4', // Nota raíz inicial
      TipoAcorde: 'major', // Tipo de acorde inicial
      NotasAcorde: [], // Notas del acorde
    };
  }

  generateChord = () => {
    const { notaRaiz, TipoAcorde } = this.state;
    const FrecuenciaRaiz = frequencyList[notaRaiz];
    let thirdFrequency, fifthFrequency, sevenFrequency, sevenmFrequency;

    switch (TipoAcorde) {
      case 'Mayor':
        thirdFrequency = frequencyList[this.getNextNoteName(notaRaiz, 4)];
        fifthFrequency = frequencyList[this.getNextNoteName(notaRaiz, 7)];
        break;
      
        

      case 'menor':
        thirdFrequency = frequencyList[this.getNextNoteName(notaRaiz, 3)];
        fifthFrequency = frequencyList[this.getNextNoteName(notaRaiz, 7)];
        break;
            
        
    case 'septimaM':
        thirdFrequency = frequencyList[this.getNextNoteName(notaRaiz, 3)];
        fifthFrequency = frequencyList[this.getNextNoteName(notaRaiz, 7)];
        sevenFrequency = frequencyList[this.getNextNoteName(notaRaiz, 11)];
        break;

    case 'septimam':
        thirdFrequency = frequencyList[this.getNextNoteName(notaRaiz, 3)];
        fifthFrequency = frequencyList[this.getNextNoteName(notaRaiz, 7)];
        sevenmFrequency = frequencyList[this.getNextNoteName(notaRaiz, 10)];
        break;

      // Otros tipos de acordes pueden ser agregados aquí
    default:
        break;
    }

    this.setState({
      NotasAcorde: [
        { grado: 1, nombre: 'Raíz', frecuencia: FrecuenciaRaiz },
        { grado: 3, nombre: 'Tercera', frecuencia: thirdFrequency },
        { grado: 5, nombre: 'Quinta', frecuencia: fifthFrequency },
        { grado: 7, nombre: 'SéptimaM', frecuencia: sevenFrequency },
        { grado: 10, nombre: 'Septimam', frecuencia:sevenmFrequency}
      ],
    });
  };

  getNextNoteName = (note, interval) => {
    const noteIndex = Object.keys(frequencyList).indexOf(note);
    const nextNoteIndex = noteIndex + interval;
    const nextNoteName = Object.keys(frequencyList)[nextNoteIndex];
    return nextNoteName;
  };

  render() {
    const { notaRaiz, TipoAcorde, NotasAcorde } = this.state;

    return (
      <div>
        <h2>Generador de Acordes</h2>
        <div>
          <label>Nota Raíz:</label>
          <select value={notaRaiz} onChange={(e) => this.setState({ notaRaiz: e.target.value })}>
            {Object.keys(frequencyList).map(note => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Tipo de Acorde:</label>
          <select value={TipoAcorde} onChange={(e) => this.setState({ TipoAcorde: e.target.value })}>
            <option value="Mayor">Mayor</option>
            <option value="menor">Menor</option>
            <option value="septimaM">Septima Mayor</option>
            <option value="septimam">Septima Menor</option>
            {/* Otros tipos de acordes pueden ser agregados aquí */}
          </select>
        </div>
        <button onClick={this.generateChord}>Generar Acorde</button>
        <div>
          <h3>Acorde Resultante:</h3>
          <ul>
          {NotasAcorde.map(nota => (
            <li key={nota.grado}>{nota.nombre}: {nota.frecuencia ? nota.frecuencia.toFixed(2) : 'Frecuencia no definida'} Hz </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ChordGenerator;
