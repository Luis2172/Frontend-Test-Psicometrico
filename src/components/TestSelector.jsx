
import React from 'react';

export default function TestSelector({ onSelect, user }) {
  return (
    <div className="p-4 max-w-sm mx-auto centered-container">
      <h3 className="text-center text-white mb-4">¡{user.name}! 👋</h3>
      <h2 className="text-white mb-4">Selecciona un test</h2>
      <div className="button-container">
      <button onClick={() => onSelect('Informática')} className="bg-green-600 text-black p-2 w-full mb-2 rounded">
        Ingeniería en Informática
      </button>
      <button onClick={() => onSelect('Sistemas')} className="bg-blue-600 text-black p-2 w-full rounded">
        Ingeniería en Sistemas Computacionales
      </button>
      </div>
    </div>
  );
}