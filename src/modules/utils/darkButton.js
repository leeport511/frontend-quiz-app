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
		const btnsSelectors = document.querySelectorAll(
			'.quiz__subject-selector--btn'
		);

		//* -- dark & light btn

		if (sunImage.src.includes('icon-sun-dark.svg')) {
			sunImage.src = './images/icon-sun-light.svg'; // versión blanca para dark
		} else {
			sunImage.src = './images/icon-sun-dark.svg'; // versión negra para light
		}

		if (moonImage.src.includes('icon-moon-dark.svg')) {
			moonImage.src = './images/icon-moon-light.svg'; // versión blanca para dark
		} else {
			moonImage.src = './images/icon-moon-dark.svg'; // versión negra para light
		}

		//* -- globals
		whiteBtnDot.classList.toggle('translated');
		body.classList.toggle('dark-theme');
		main.classList.toggle('main-dark');

		//* -- home
		quiz.classList.toggle('quiz-dark-theme');
		paragraph.classList.toggle('dark-paragraph');

		btnsSelectors.forEach((btn) => {
			btn.classList.toggle('dark-selector');
		});
	});
};
