const darkButton = document.getElementById('dark-white-btn');
const whiteBtnDot = document.querySelector('.btn__white-dot');
const sunImage = document.getElementById('sun-img');
const moonImage = document.getElementById('moon-img');
const body = document.querySelector('body');
const main = document.querySelector('.main');

export const handleDarkBtnAction = () => {
	darkButton.addEventListener('click', () => {
		const quiz = document.querySelector('.quiz');
		const paragraph = document.querySelector('.quiz__title p');
		const quizTitle = document.querySelector(
			'.header__quiz-title--text'
		);
		const btnsSelectors = document.querySelectorAll(
			'.quiz__subject-selector--btn'
		);

		//* -- dark & light btn

		if (sunImage.src.includes('icon-sun-dark.svg')) {
			sunImage.src = '/images/icon-sun-light.svg'; // versión blanca para dark
		} else {
			sunImage.src = '/images/icon-sun-dark.svg'; // versión negra para light
		}

		if (moonImage.src.includes('icon-moon-dark.svg')) {
			moonImage.src = '/images/icon-moon-light.svg'; // versión blanca para dark
		} else {
			moonImage.src = '/images/icon-moon-dark.svg'; // versión negra para light
		}

		//* -- globals
		whiteBtnDot.classList.toggle('translated');
		body.classList.toggle('dark-theme');
		main.classList.toggle('main-dark');
		quizTitle.classList.toggle('dark-theme');

		//* -- home
		quiz?.classList.toggle('quiz-dark-theme');
		paragraph?.classList.toggle('dark-paragraph');

		btnsSelectors?.forEach((btn) => {
			btn.classList.toggle('dark-selector');
		});

		quizPostRenderDarkTheme();
	});
};

export const quizPostRenderDarkTheme = () => {
	const isDark = body.classList.contains('dark-theme');

	const questionProgression = document.querySelector(
		'.question__container-progression'
	);
	const questionText = document.querySelector(
		'.question__container-text'
	);

	const questionOptionsContainers = document.querySelectorAll(
		'.question__options--container'
	);

	const resultsQuizTitle =
		document.querySelector('.results__title');

	const resultsQuizBox = document.querySelector('.results__box');

	const resultsQuizBoxBottomText = document.querySelector(
		'.results__box--number-text'
	);

	const resultsQuizBoxBottomNumber = document.querySelector(
		'.results__box--number-big'
	);

	// Question render
	if (questionProgression)
		questionProgression.classList.toggle(
			'quiz-dark-theme',
			isDark
		);

	if (questionText)
		questionText.classList.toggle('quiz-dark-theme', isDark);

	if (questionOptionsContainers) {
		questionOptionsContainers.forEach((opt) => {
			const optLetter = document.querySelectorAll(
				'.question__options--container-letter'
			);
			opt.classList.toggle('quiz-dark-theme', isDark);
			optLetter.forEach((letter) => {
				letter.classList.toggle('quiz-dark-theme', isDark);
			});
		});
	}

	// Results Render

	if (resultsQuizTitle)
		resultsQuizTitle.classList.toggle(
			'results-dark-theme',
			isDark
		);

	if (resultsQuizBox)
		resultsQuizBox.classList.toggle(
			'results-dark-theme-box',
			isDark
		);

	if (resultsQuizBoxBottomText)
		resultsQuizBoxBottomText.classList.toggle(
			'results-dark-theme',
			isDark
		);

	if (resultsQuizBoxBottomNumber)
		resultsQuizBoxBottomNumber.classList.toggle(
			'results-dark-theme',
			isDark
		);
};
