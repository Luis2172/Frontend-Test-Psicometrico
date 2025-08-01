
import { useState } from "react";
import { enviarResultado } from "./enviarData";

export default function Result({ user, answers, onRestart, testType, setUser }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const total = answers.length * 5;
  const score = answers.reduce((a, b) => a + b, 0);
  const logica = answers.slice(0, 9);
  const logicaTotal = 9 * 5;
  const logicaScore = logica.reduce((a, b) => a + b, 0);

  let mensaje = '';
  let result = '';

  if (logicaScore < 32) {
    mensaje = 'Tu puntaje en razonamiento lógico fue bajo. Te recomendamos fortalecer esta habilidad antes de considerar esta carrera.';
    result = 'Reprobado';
  } else if (score >= total * 0.8) {
    mensaje = 'Alta afinidad. Tienes un perfil excelente para esta carrera.';
    result = 'Aprobado';
  } else if (score >= total * 0.6) {
    mensaje = 'Afinidad media. Podrías desarrollarla más con estudio.';
    result = 'Aprobado';
  } else {
    mensaje = 'Baja afinidad. Puedes mejorar si te interesa la carrera.';
    result = 'Reprobado';
  }

  const handleClick = async () => {
    setSending(true);
    setError(null);
    try {
      await enviarResultado({ user, testType, logica, logicaScore, score });
      setSent(true);
      setTimeout(() => {
        onRestart();
        setUser(null);
      }, 3000); // pequeña pausa para ver el mensaje de éxito
    } catch (err) {
      console.error(err);
      setError("Error al enviar el correo. Intenta nuevamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-white text-center px-4">
      <h2 className="mb-4 fs-1">Resultados</h2>
      <p className="fw-bold fs-4 mb-2">{user.name} {user.apellido}</p>

      <p className="text-light fs-5 mb-4">
        Test: Ingeniería en {testType === 'Sistemas' ? 'Sistemas Computacionales' : 'Informática'}
      </p>

      <h4 className="fs-3 mb-2">Puntaje: {score} / {total}</h4>
      <h5 className="fs-5 mb-2">Lógica: {logicaScore} / {logicaTotal}</h5>

      <p className="fs-5 mb-4">{mensaje}</p>
      <p className="fs-5 mb-4">{result}</p>

      <button 
        onClick={handleClick}
        className="btn btn-primary btn-lg px-4"
        disabled={sending || sent}
      >
        {sending ? 'Enviando...' : sent ? '¡Enviado!' : 'Enviar resultados a mi correo'}
      </button>

      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
}
