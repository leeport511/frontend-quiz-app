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
		renderFinalResult();
		return;
	}

	const { answer, options, question } = questionIndex[index];

	const app = document.getElementById('app');

	app.innerHTML = `
		<section class="question">
			<div class="question__container">
				<p class="question__container-progression">Question ${index + 1} of ${
		questionIndex.length
	}</p>
				<p class="question__container-text"> ${question} </p>
			</div>
			<div class="question__progress-bar">
				<div class="question__progress-bar--line"></div>
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

	let optionContainer;
	let optionLetter;
	let optionParagraph;
	let selectedAnswer;

	options.forEach((opt, index) => {
		optionContainer = document.createElement('DIV');
		optionLetter = document.createElement('SPAN');
		optionParagraph = document.createElement('P');

		optionContainer.className = 'question__options--container';
		optionContainer.tabIndex = '0';
		optionLetter.className =
			'question__options--container-letter';
		optionParagraph.className =
			'question_options--container-text';

		optionLetter.textContent = ['A', 'B', 'C', 'D'][index];

		optionParagraph.textContent = opt;

		optionContainer.addEventListener('click', (e) => {
			document
				.querySelectorAll('.question__options--container')
				.forEach((el) => el.removeAttribute('isSelected'));

			e.currentTarget.setAttribute('isSelected', 'true');

			selectedAnswer = e.currentTarget.children[1].textContent;
		});

		optionContainer.appendChild(optionLetter);
		optionContainer.appendChild(optionParagraph);
		optionSelector.appendChild(optionContainer);
	});

	const submitButton = document.querySelector(
		'.question__btn-submit'
	);

	submitButton.addEventListener('click', () =>
		submitAnswer(answer, selectedAnswer)
	);
};

//todo: terminar estilos de correcto e incorrecto

const nextQuestion = (nextIndex) => {};

const submitAnswer = (answer, selectedAnswer) => {
	if (!selectedAnswer) {
		alert('please Select an answer');
		return;
	}

	console.log(answer);
	console.log(selectedAnswer);

	const selectedOption = document.querySelector(
		'.question__options--container[isSelected]'
	);
	const selectedLetterOption = selectedOption.querySelector(
		'.question__options--container-letter'
	);
	const submitButton = document.querySelector(
		'.question__btn-submit'
	);

	const nextButton = document.querySelector('.question__btn-next');

	if (answer === selectedAnswer) {
		selectedOption.classList.add('green-border');
		selectedLetterOption.classList.add('green-letter');
		submitButton.style.display = 'none';
	} else {
		selectedOption.classList.add('red-border');
		selectedLetterOption.classList.add('red-letter');
		submitButton.style.display = 'none';
	}

	nextButton.style.display = 'inline';
};

const renderFinalResult = () => {};
export { startQuiz, renderQuestions };
