import { quizPostRenderDarkTheme } from '../utils/darkButton';
import { createElement } from '../utils/helpers';
import { getSubjectData } from '../utils/storage';
import { nextQuestion, submitAnswer } from './quizController';
import { setProgressBarState } from './quizProgressBar';
import {
	getCorrectAnswerCounter,
	resetCorrectAnswerCounter,
} from './quizState';
import { renderHome } from './renderHome';
import { subjectSelector } from './subjectSelector';

export const renderQuestions = async (questions, index) => {
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
	<div class="question__progress-line"></div>
	</div>
	<div class="question__options"></div>
	<button class="question__btn-submit">Submit Answer</button>
	<button class="question__btn-next">Next Question</button>
	</section>
      `;

	setProgressBarState(index);
	const optionSelector = document.querySelector(
		'.question__options'
	);
	let selectedAnswer;

	options.forEach((opt, i) => {
		const optionContainer = createElement(
			'DIV',
			'question__options--container',
			`
                        <span class="question__options--container-letter">${
							['A', 'B', 'C', 'D'][i]
						}</span>
                        <p class="question__options--container-text">${opt}</p>
                  `
		);
		optionContainer.tabIndex = '0';
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

	document
		.querySelector('.question__btn-next')
		.addEventListener('click', () => {
			nextQuestion(questions, index);
		});

	quizPostRenderDarkTheme();
};

export const renderFinalResult = () => {
	const correctAnswerCounter = getCorrectAnswerCounter();

	const subjectMetaDAta = getSubjectData();

	const { topic, icon, iconColor } = subjectMetaDAta;

	const app = document.getElementById('app');

	app.innerHTML = `
		<section class="results">
			<div class="results__title">
				<p>Quiz completed<br><b>You scored...</b></p>
			</div>
			<div class="results__box">
				<div class="results__box--title">
					<div class="results__box--title-imgbox">
						<img src="${icon}" alt="${topic}">
					</div>
					<p>${topic}</p>
				</div>
				<div class="results__box--number">
					<p class="results__box--number-big">${correctAnswerCounter}</p>
					<p class="results__box--number-text">out of 10</p>
				</div>
			</div>
			<button class="results__btn">Play Again</button>
		</section>
	`;

	document.querySelector(
		'.results__box--title-imgbox'
	).style.backgroundColor = iconColor;

	const playAgainBtn = document.querySelector('.results__btn');

	const setAgainHome = () => {
		resetCorrectAnswerCounter();
		renderHome();
		subjectSelector();
	};

	playAgainBtn.addEventListener('click', setAgainHome);

	quizPostRenderDarkTheme();
};
