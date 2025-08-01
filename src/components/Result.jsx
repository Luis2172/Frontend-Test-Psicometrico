
import { useState } from "react";
import { enviarResultado } from "./enviarData";
import '../CSS/result.css'

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
      }, 2500); 
    } catch (err) {
      console.error(err);
      setError("Error al enviar el correo. Intenta nuevamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="result-screen">
      <div className="result-card">
        <h2 className="result-title">🎓 Resultados</h2>
        <h4 className="user-name">{user.name} {user.apellido}</h4>
        <p className="test-type">
          Test: Ingeniería en <strong>{testType === 'Sistemas' ? 'Sistemas Computacionales' : 'Informática'}</strong>
        </p>

        <div className="score-box">
          <h4 className="score-text">Puntaje total: <span>{score} / {total}</span></h4>
          <h5 className="logic-score">Razonamiento lógico: <span>{logicaScore} / {logicaTotal}</span></h5>
        </div>

        <p className="message">{mensaje}</p>

        <p className={`result-status ${result === 'Aprobado' ? 'text-success' : 'text-danger'}`}>
          {result}
        </p>

        <button
          onClick={handleClick}
          className="send-button"
          disabled={sending || sent}
        >
          {sending ? 'Enviando...' : sent ? '¡Enviado!' : 'Enviar resultados a mi correo'}
        </button>

        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    </div>
  );
};
