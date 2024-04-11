import React, { useState, useEffect } from 'react';

function Pedalera({ nombre, sonidoInicial, modificarSonido }) {
  const [sonido, setSonido] = useState(sonidoInicial);

  const handleModificarSonido = () => {
    const nuevoSonido = modificarSonido(sonido);
    setSonido(nuevoSonido);
  };

  return (
    <div>
      <h2>{nombre}</h2>
      <p>Sonido actual: {sonido}</p>
      <button onClick={handleModificarSonido}>Modificar Sonido</button>
    </div>
  );
}

function PedalerasSection() {
  const [renderizarPedaleras, setRenderizarPedaleras] = useState(false);

  const modificarSonido = sonido => {
    // Modificamos el sonido añadiendo " con eco"
    const sonidoModificado = sonido + ' con eco';
   
    return sonidoModificado;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRenderizarPedaleras(true);
    }, 3000); // Retraso de 3 segundos

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <h1>Sección de Pedaleras</h1>
      {renderizarPedaleras && (
        <>
          <Pedalera nombre="Pedalera 1" sonidoInicial="Sonido 1" modificarSonido={modificarSonido} />
          <Pedalera nombre="Pedalera 2" sonidoInicial="Sonido 2" modificarSonido={modificarSonido} />
          <Pedalera nombre="Pedalera 3" sonidoInicial="Sonido 3" modificarSonido={modificarSonido} />
        </>
      )}
    </div>
  );
}

export default PedalerasSection;
