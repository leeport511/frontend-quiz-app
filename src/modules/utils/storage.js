export const saveSubjectData = (topic, icon, iconColor) => {
	localStorage.setItem(
		'subjectData',
		JSON.stringify({
			topic,
			icon,
			iconColor,
		})
	);
};

export const getSubjectData = () => {
	return JSON.parse(localStorage.getItem('subjectData'));
};

export const clearStorage = () => {
	localStorage.clear();
};
