import { renderHome } from './modules/quiz/renderHome';
import { subjectSelector } from './modules/quiz/subjectSelector';
import { handleDarkBtnAction } from './modules/utils/darkButton';

document.addEventListener('DOMContentLoaded', async () => {
	renderHome();
	subjectSelector();
	handleDarkBtnAction();
});
