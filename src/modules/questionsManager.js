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
	const questionList = await questions;
	if (index >= questionList.length) return renderFinalResult();

	const { answer, options, question } = questionList[index];
	const app = document.getElementById('app');

	app.innerHTML = `
	    <section class="question">
		  <div class="question__container">
			<p class="question__container-progression">Question ${index + 1} of ${
		questionList.length
	}</p>
			<p class="question__container-text">${question}</p>
		  </div>
		  <div class="question__progress-bar">
			<div class="question__progress-bar--line"></div>
		  </div>
		  <div class="question__options"></div>
		  <button class="question__btn-submit">Submit Answer</button>
		  <button class="question__btn-next">Next Question</button>
	    </section>
	`;

	const optionSelector = document.querySelector(
		'.question__options'
	);
	let selectedAnswer;

	options.forEach((opt, i) => {
		const optionContainer = document.createElement('DIV');
		optionContainer.className = 'question__options--container';
		optionContainer.tabIndex = '0';
		optionContainer.innerHTML = `
		  <span class="question__options--container-letter">${
				['A', 'B', 'C', 'D'][i]
			}</span>
		  <p class="question__options--container-text">${opt}</p>
	    `;

		optionContainer.addEventListener('click', (e) => {
			document
				.querySelectorAll('.question__options--container')
				.forEach((el) => el.removeAttribute('isSelected'));

			e.currentTarget.setAttribute('isSelected', 'true');
			selectedAnswer =
				e.currentTarget.querySelector('p').textContent;
		});

		optionSelector.appendChild(optionContainer);
	});

	const correctAnswer = [
		...document.querySelectorAll('.question__options--container'),
	].find((el) => el.querySelector('p').textContent === answer);

	document
		.querySelector('.question__btn-submit')
		.addEventListener('click', () =>
			submitAnswer(answer, selectedAnswer, correctAnswer)
		);
};

//todo: terminar estilos de correcto e incorrecto

const nextQuestion = (nextIndex) => {};

const submitAnswer = (answer, selectedAnswer, correctAnswer) => {
	if (!selectedAnswer) {
		const errorContainer = document.createElement('div');
		errorContainer.className = 'question__error';
		errorContainer.innerHTML = `
		<img src="/src/assets/images/icon-error.svg" alt="error-icon">
		<p>Please select an answer</p>
		`;

		document
			.querySelector('.question')
			.appendChild(errorContainer);

		return;
	}

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

	const createIcon = (src, className, alt) => {
		const icon = document.createElement('IMG');
		icon.src = src;
		icon.className = className;
		icon.alt = alt;
		return icon;
	};

	const isCorrect = answer === selectedAnswer;
	selectedOption.classList.add(
		isCorrect ? 'green-border' : 'red-border'
	);
	selectedLetterOption.classList.add(
		isCorrect ? 'green-letter' : 'red-letter'
	);
	selectedOption.appendChild(
		createIcon(
			`/src/assets/images/icon-${
				isCorrect ? 'correct' : 'incorrect'
			}.svg`,
			isCorrect ? 'correct-answer' : 'wrong-answer',
			isCorrect ? 'correct-icon' : 'wrong-icon'
		)
	);

	if (!isCorrect)
		correctAnswer.appendChild(
			createIcon(
				'/src/assets/images/icon-correct.svg',
				'correct-answer',
				'correct-icon'
			)
		);

	submitButton.style.display = 'none';
	nextButton.style.display = 'inline';
};

const renderFinalResult = () => {};
export { startQuiz, renderQuestions };
