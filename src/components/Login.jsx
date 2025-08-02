
import React, { useState, useRef } from 'react';
import '../CSS/Styles.css';

//import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [nivel, setNivel] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ name, apellido, nivel });
  };

  return (
  <div className="min-vh-100 d-flex align-items-center justify-content-center text-white form-wrapper">
    <div className="form-container bg-white rounded shadow text-dark">
      <h2 className="mb-4 text-center">Test Psicometrico</h2>

      <p className='p-login text-center'>
        Este test te ayudará a descubrir qué tanto te identificas con el perfil de Ingeniería en Informática o en Sistemas Computacionales.
      </p>

      <p className="checkbox-label" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px', marginTop: '-5px', marginBottom: '15px' }}>
        *Todos los campos son obligatorios
      </p>

      <form onSubmit={ handleSubmit } >
        <input
          type="text"
          placeholder="Nombre"
          className="form-control mb-3 input-form"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Apellido"
          className="form-control mb-3 input-form"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

  

  <div className="mb-4">
    <p className="text-dark fw-semibold text-center mb-3 fs-6">
      ¿Cuál es tu nivel académico actual?
    </p>
    <div className="d-flex gap-3 justify-content-center">
      <button 
        type="button"
        className={`btn px-4 py-2 rounded-pill fw-bold shadow-sm border ${
          nivel === 'Preparatoria' ? 'btn-success text-white' : 'btn-outline-primary'
        }`}
        onClick={() => setNivel('Preparatoria')}
      >
        Preparatoria
      </button>

      <button 
        type="button"
        className={`btn px-4 py-2 rounded-pill fw-bold shadow-sm border ${
          nivel === 'Ingeniería' ? 'btn-success text-white' : 'btn-outline-primary'
        }`}
        onClick={() => setNivel('Ingeniería')}
      >
        Ingeniería
      </button>
    </div>
</div>


<div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
      <input
        type="checkbox"
        id="permisoCorreo"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        style={{ marginTop: '4px', marginRight: '8px', transform: 'translateY(3px)' }}
      />
      <label className="checkbox-label" htmlFor="permisoCorreo" >
        Acepto que mis datos serán utilizado únicamente con fines educativos y de orientación vocacional.
      </label>
    </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={
            !name.trim() ||
            !apellido.trim() ||
            !nivel.trim() ||
            !isChecked
          }
        >
          Continuar
        </button>


      </form>
    </div>
  </div>
);
}