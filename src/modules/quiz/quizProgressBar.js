export const setProgressBarState = (index) => {
	const progressBar = document.querySelector(
		'.question__progress-line'
	);
	const percentage = Math.round((index / (10 - 1)) * 100);

	progressBar.style.width = `${percentage}%`;
};

export const resetProgressBar = (index) => {
	if (index === 0) progressBar.style.width = `0%`;
};
