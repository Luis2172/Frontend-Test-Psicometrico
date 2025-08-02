
import { useState } from "react";
import { enviarResultado } from "./enviarData";
import '../CSS/result.css'
import {generarPDF} from './PdfGenerator'

export default function Result({ user, answers, onRestart, testType}) {

  const total = answers.length * 5;
  const score = answers.reduce((a, b) => a + b, 0);
  const logica = answers.slice(0, 9);
  const logicaTotal = 9 * 5;
  const logicaScore = logica.reduce((a, b) => a + b, 0);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

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
    try {
      await enviarResultado({ user, testType, answers, logicaScore, score });
      setSent(true);
      setTimeout(() => {
        onRestart();
      }, 2500); 
    } catch (err) {
      console.error("Error al guardar el resultado:", err);
    } finally {
      setSending(false);
    }
  };

  const handleDownloadPDF = () => {
  generarPDF({ user, testType, logicaScore, score, mensaje, result })
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

        <div className="d-flex flex-column gap-3 mt-4 w-100" style={{ maxWidth: '600px' }}>
        <button onClick={handleDownloadPDF} className="btn btn-outline-info btn-lg w-100">
          Descargar resultados en PDF
        </button>
        <button 
          onClick={handleClick} 
          className="btn btn-outline-light btn-lg w-100"
          disabled={sending || sent}
        >
          {sending ? 'Enviando...' : sent ? '¡Enviado!' : 'Enviar Resultados'}
        </button>
      </div>

        
      </div>
    </div>
  );
};
