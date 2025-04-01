import { getData } from '../data/getData';
import { startQuiz } from './quizController';

const subjectSelector = async () => {
	const subjectsContainer = document.querySelector(
		'.quiz__subject-selector'
	);

	const { quizzes } = await getData();

	const fragment = document.createDocumentFragment();
	let subjectImage;
	let subjectTitle;

	quizzes.forEach(({ icon, title, iconColor }) => {
		subjectImage = document.createElement('img');
		subjectImage.className = 'quiz__subject-selector--img';
		subjectImage.src = icon;
		subjectImage.alt = `${title} icon`;
		subjectImage.style.backgroundColor = iconColor;

		subjectTitle = document.createElement('button');
		subjectTitle.className = 'quiz__subject-selector--btn';
		subjectTitle.id = title;
		subjectTitle.textContent = title;

		subjectTitle.appendChild(subjectImage);
		fragment.appendChild(subjectTitle);

		subjectsContainer.appendChild(fragment);

		startQuiz(subjectTitle.id, icon, iconColor);
	});
};

export { subjectSelector };
