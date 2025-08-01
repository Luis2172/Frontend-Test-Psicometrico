import React from 'react';
import '../CSS/question.css';

const options = [1, 2, 3, 4, 5];
const descripciones = [
  "Totalmente en desacuerdo",
  "En desacuerdo",
  "Neutral",
  "De acuerdo",
  "Totalmente de acuerdo"
];


export default function Question({ question, index, total, onAnswer, progress }) {
  const percentage = Math.round((progress / total) * 100); 
  return (
    
    <div className="question-container">

      <div className="custom-progress-container">
        <div className="custom-progress-bar">
          <div
            className="custom-progress-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="custom-progress-label">{percentage}%</span>
      </div>

      <h3 className="question-title">Pregunta {index + 1} de {total}</h3>
      <p className="question-text">{question.text}</p>

      <div className="options-grid">
        {options.map((val) => (
          <button
            key={val}
            onClick={() => onAnswer(val)}
            className="option-button"
          >
            {val} - {descripciones[val - 1]}
          </button>
        ))}
      </div>
    </div>
  );
}
