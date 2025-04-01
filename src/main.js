import { renderHome } from './modules/quiz/renderHome';
import { subjectSelector } from './modules/quiz/subjectSelector';

document.addEventListener('DOMContentLoaded', async () => {
	renderHome();
	subjectSelector();
});
