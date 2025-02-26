import { getData } from './getData';

const startQuiz = (topic) => {
	const subjectButton = document.getElementById(`${topic}`);

	subjectButton.addEventListener('click', () => {
		console.log('seleccion de boton', subjectButton.id);
		getQuestions(subjectButton.id);
	});
};

const getQuestions = async (topic) => {
	const { quizzes } = await getData();

	quizzes.forEach(({ title, questions }) => {
		if (title === topic) console.log({ questions });
	});
};

const renderQuestions = () => {
	console.log('Preguntas y opciones');
};

export { startQuiz, renderQuestions };
