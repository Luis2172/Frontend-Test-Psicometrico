
const options = [1, 2, 3, 4, 5];
const descripciones = [
  "Totalmente en desacuerdo",
  "En desacuerdo",
  "Neutral",
  "De acuerdo",
  "Totalmente de acuerdo"
];

export default function Question({ question, index, total, onAnswer, progress }) {
  
  return (
    <div className='flex flex-col items-center text-center px-4'>
      <progress value={progress} max={total} className="w-100 mb-4"></progress>
      <h3 className="text-white mb-3">Pregunta {index + 1} de {total}</h3>
      <div className='pregunta-container'>
        <p className='text-white text-large'>{question.text}</p>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
      {options.map(val => (
        <button
          key={val}
          onClick={() => onAnswer(val)}
          className="text-small mx-1 p-2 min-w-[250px] border rounded hover:bg-gray-100 bg-white text-black"
        >
          { val } - { descripciones[val - 1] }
        </button>
      ))}
      </div>
    </div>
  );
}