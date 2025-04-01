import { getData } from '../data/getData';

import { createElement, createImage } from '../utils/helpers';
import { clearStorage, saveSubjectData } from '../utils/storage';
import { renderQuestions } from './quizRenders';

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

let questions;

let correctAnswerCounter = 0;

export const startQuiz = (topic, icon, iconColor) => {
	clearStorage();
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
		questions = getQuestions(subjectButton.id);
		let currentIndex = 0;
		saveSubjectData(topic, icon, iconColor);
		renderQuestions(questions, currentIndex);
	});
};

export const getQuestions = async (topic) => {
	const { quizzes } = await getData();
	const quiz = quizzes.find(({ title }) => title === topic);

	return quiz ? quiz.questions : [];
};

export const nextQuestion = (questions, index) => {
	const nextIndex = index + 1;

	renderQuestions(questions, nextIndex);
};

export const submitAnswer = (
	answer,
	selectedAnswer,
	correctAnswer
) => {
	if (!selectedAnswer) {
		if (!document.querySelector('.question__error')) {
			const errorContainer = createElement(
				'div',
				'question__error',
				`
					<img src="/src/assets/images/icon-error.svg" alt="error-icon">
					<p>Please select an answer</p>
				`
			);

			document
				.querySelector('.question')
				.appendChild(errorContainer);

			return;
		}
	} else if (document.querySelector('.question__error') !== null) {
		document.querySelector('.question__error').style.display =
			'none';
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

	const isCorrect = answer === selectedAnswer;
	selectedOption.classList.add(
		isCorrect ? 'green-border' : 'red-border'
	);
	selectedLetterOption.classList.add(
		isCorrect ? 'green-letter' : 'red-letter'
	);
	selectedOption.appendChild(
		createImage(
			`/src/assets/images/icon-${
				isCorrect ? 'correct' : 'incorrect'
			}.svg`,
			isCorrect ? 'correct-answer' : 'wrong-answer',
			isCorrect ? 'correct-icon' : 'wrong-icon'
		)
	);

	if (!isCorrect)
		correctAnswer.appendChild(
			createImage(
				'/src/assets/images/icon-correct.svg',
				'correct-answer',
				'correct-icon'
			)
		);

	if (isCorrect) correctAnswerCounter += 1;

	submitButton.style.display = 'none';
	nextButton.style.display = 'inline';
};

//todo: make day night btn, responsive and finish
