import { renderHome } from './modules/renderHome';
import { subjectSelector } from './modules/subjectSelector';

document.addEventListener('DOMContentLoaded', async () => {
	renderHome();
	subjectSelector();
});
