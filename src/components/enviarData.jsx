
export const enviarResultado = async (sendData) => {

    const { user, testType, answers, logicaScore, score } = sendData;
  const data = {
    name: user.name,
    apellido: user.apellido,
    nivel: user.nivel,
    testType,
    answers: answers,
    logicScore: logicaScore,
    totalScore: score
  };

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result.message);

  } catch (error) {
    console.error("Error al enviar resultado:", error);
  }
};
