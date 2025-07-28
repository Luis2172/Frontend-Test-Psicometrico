
import React, { useState, useRef } from 'react';
import '../Styles.css';

//import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setCorreo] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  const correoRef = useRef();

  const esCorreoValido = (correo) => {
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
    const partes = correo.split('@');
    if (partes.length !== 2) return false;
    return dominiosPermitidos.includes(partes[1].toLowerCase());
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    if (!esCorreoValido(email)) {
      correoRef.current.setCustomValidity("El correo debe terminar en gmail.com, hotmail.com, outlook.com o yahoo.com");
      correoRef.current.reportValidity();
      return;
    }

    onLogin({ name, apellido, email });
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

        <input
          type="email"
          ref={correoRef}
          placeholder="Correo"
          className="form-control mb-4 input-form"
          value={email}
          onChange={(e) => {
            setCorreo(e.target.value);
            correoRef.current.setCustomValidity(""); 
          }}
          required
        />

        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
          <input
            type="checkbox"
            id="permisoCorreo"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            style={{ marginTop: '4px', marginRight: '8px', transform: 'translateY(3px)' }}
          />
          <label className="checkbox-label" htmlFor="permisoCorreo" >
            Acepto que mi correo electrónico será utilizado únicamente con fines educativos y de orientación vocacional.
          </label>
        </div>


        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={
            !name.trim() ||
            !apellido.trim() ||
            !email.trim() ||
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