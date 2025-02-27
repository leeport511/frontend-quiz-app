import { getData } from './getData';

const allSubjectButtons = document.querySelectorAll(
	'.quiz__subject-selector--btn'
);
const headerQuestionTitleContainer = document.querySelector(
	'.header__quiz-title'
);
const headerQuestionTitle = document.querySelector(
	'.header__quiz-title--text'
);

const headerquestionTitleImgCont = document.querySelector(
	'.header__quiz-title--img-cont'
);

const headerquestionTitleImg = document.querySelector(
	'.header__quiz-title--img-cont img'
);

const startQuiz = (topic, icon, iconColor) => {
	const subjectButton = document.getElementById(`${topic}`);

	subjectButton.addEventListener('click', () => {
		allSubjectButtons.forEach((btn) =>
			btn.removeAttribute('data-selected')
		);
		subjectButton.setAttribute('data-selected', 'true');
		headerQuestionTitleContainer.style.visibility = 'visible';
		headerQuestionTitle.textContent = `${topic}`;
		headerquestionTitleImg.src = icon;
		headerquestionTitleImgCont.style.backgroundColor = iconColor;
		const questions = getQuestions(subjectButton.id);
		let currentIndex = 0;
		renderQuestions(questions, currentIndex);
	});
};

const getQuestions = async (topic) => {
	const { quizzes } = await getData();
	const quiz = quizzes.find(({ title }) => title === topic);

	return quiz ? quiz.questions : [];
};

//* las preguntas es un array, se tiene que recorrerlo.
const renderQuestions = (questions, index) => {
	if (index >= questions.length) {
		renderResult();
		return;
	}

	const app = document.getElementById('app');

	app.innerHTML = ` aca va la pagina de la primer pregunta`;
};

const renderResult = () => {};

const nextQuestion = (nextIndex) => {};

export { startQuiz, renderQuestions };
