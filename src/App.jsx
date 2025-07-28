import React, { useState } from 'react';
import Login from './components/Login.jsx';
import TestSelector from './components/TestSelector.jsx';
import Question from './components/Question.jsx';
import Result from './components/Result.jsx';
import { questionsSistemas } from './data/questionSistemas'
import { questionsInformatica } from './data/questionInformatica';
import './Styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [testType, setTestType] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = (testType === 'Sistemas') ? questionsSistemas : questionsInformatica;
  const isFinished = (answers.length === questions.length);

  const handleAnswer = (value) => {
    const updated = [...answers, value];
    setAnswers(updated);
    if (updated.length < questions.length) {
      setCurrent(current + 1);
    }
  };

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setTestType(null);
  };

  if (!user) return <Login onLogin={setUser} />;
  if (!testType) return <TestSelector onSelect={setTestType} user={user}/>;
  if (isFinished) return <Result user={ user } answers={ answers } onRestart={ restart } testType={ testType } setUser={setUser}/>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Question
        question={questions[current]}
        index={current}
        total={questions.length}
        onAnswer={handleAnswer}
        progress={answers.length}
      />
    </div>
  );
}

export default App;