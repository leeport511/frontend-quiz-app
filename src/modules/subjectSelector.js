import { getData } from './getData';

const subjectSelector = async () => {
	const subjectsContainer = document.querySelector(
		'.quiz__subject-selector'
	);

	const { quizzes } = await getData();

	quizzes.forEach((quiz) => {
		console.log(quiz.icon);

		const subjectImage = document.createElement('img');
		subjectImage.setAttribute('src', `${quiz.icon}`);
		subjectImage.setAttribute('alt', `${quiz.title} icon`);
		subjectImage.classList.add('quiz__subject-selector--img');
		subjectImage.style.backgroundColor = `${quiz.iconColor}`;
		const subjectTitle = document.createElement('button');
		subjectTitle.classList.add('quiz__subject-selector--btn');
		subjectTitle.textContent = quiz.title;
		subjectTitle.appendChild(subjectImage);
		subjectsContainer.appendChild(subjectTitle);
	});
};

export { subjectSelector };
