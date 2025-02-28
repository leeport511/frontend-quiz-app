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

const renderQuestions = async (questions, index) => {
	const questionIndex = await questions;
	if (index >= questionIndex.length) {
		renderResult();
		return;
	}

	const { answer, options, question } = questionIndex[index];

	const app = document.getElementById('app');

	app.innerHTML = `
		<section class="question">
			<div class="question__container">
				<p class="question__container-number">Question ${index + 1} of ${
		questionIndex.length
	}</p>
				<p class="question__container-text"> ${question} </p>
			</div>
			<div class="question__options">
			</div>
			<button class="question__btn-submit">Submit Answer</button>
			<button class="question__btn-next">Next Question</button>
		</section>
	`;

	const optionSelector = document.querySelector(
		'.question__options'
	);

	options.forEach((opt) => {
		console.log(opt);

		let optionParagraph = document.createElement('P');
		optionParagraph.textContent = opt;

		console.log(optionParagraph);

		optionSelector.appendChild(optionParagraph);
	});
};

const renderResult = () => {};

const nextQuestion = (nextIndex) => {};

export { startQuiz, renderQuestions };
