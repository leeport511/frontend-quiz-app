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

let questions;

const startQuiz = (topic, icon, iconColor) => {
	localStorage.clear();
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
		localStorage.setItem(
			'subjectData',
			JSON.stringify({
				topic,
				icon,
				iconColor,
			})
		);
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

	document
		.querySelector('.question__btn-next')
		.addEventListener('click', () => {
			nextQuestion(questions, index);
		});
};

//todo: terminar estilos de correcto e incorrecto

const nextQuestion = (questions, index) => {
	const nextIndex = index + 1;

	renderQuestions(questions, nextIndex);
};

const submitAnswer = (answer, selectedAnswer, correctAnswer) => {
	if (!selectedAnswer) {
		if (!document.querySelector('.question__error')) {
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

const renderFinalResult = () => {
	const subjectMetaDAta = JSON.parse(
		localStorage.getItem('subjectData')
	);

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
					<p class="results__box--number-big">10</p>
					<p class="results__box--number-text">out of 10</p>
				</div>
			</div>
			<button class="results__btn">Play Again</button>
		</section>
	`;

	document.querySelector(
		'.results__box--title-imgbox'
	).style.backgroundColor = iconColor;
};

export { startQuiz, renderQuestions };

//todo: make logic to count the correct answer and show points
