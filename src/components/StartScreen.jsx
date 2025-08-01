import React from 'react';
import '../CSS/StartScreen.css'; // Si tienes estilos separados



export default function StartScreen( { user , onContinue } ) {
  // contenido del componente
return (
    <div className="start-container">
        <h2>Hola {user.name} 👋, bienvenido(a) al Test de Afinidad Profesional</h2>

        <p className="intro">
            Antes de comenzar, te explicamos brevemente en qué consiste el test.
        </p>

        <p className="highlight">
            Este test te ayudará a conocer tu afinidad con dos carreras del área tecnológica:<br />
            <strong>Ingeniería en Sistemas Computacionales</strong> e <strong>Ingeniería en Informática</strong>.
        </p>

        <p className="instructions">
            Responderás una serie de afirmaciones relacionadas con lógica, tecnología y resolución de problemas. <br />
            Por cada afirmación, selecciona tu nivel de acuerdo en una escala del 1 al 5:
        </p>

        <ul className="scale-list">
        <li><span className="num">1</span> <span className="text">– Totalmente en desacuerdo</span></li>
        <li><span className="num">2</span> <span className="text">– En desacuerdo</span></li>
        <li><span className="num">3</span> <span className="text">– Neutral</span></li>
        <li><span className="num">4</span> <span className="text">– De acuerdo</span></li>
        <li><span className="num">5</span> <span className="text">– Totalmente de acuerdo</span></li>
        </ul>


        <button className="start-button" onClick={onContinue}>
            Continuar
        </button>
    </div>
)
};
