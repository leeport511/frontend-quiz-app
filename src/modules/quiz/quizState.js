export const quizState = {
	correctAnswerCounter: 0,
};

export const getCorrectAnswerCounter = () =>
	quizState.correctAnswerCounter;

export const incrementCorrectAnswerCounter = () => {
	quizState.correctAnswerCounter += 1;
};

export const resetCorrectAnswerCounter = () => {
	quizState.correctAnswerCounter = 0;
};
