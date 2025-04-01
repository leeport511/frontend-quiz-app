export const createElement = (tag, className, innerHTML = '') => {
	const el = document.createElement(tag);
	el.className = className;
	el.innerHTML = innerHTML;
	return el;
};

export const createImage = (src, className, alt = '') => {
	const img = document.createElement('img');
	img.src = src;
	img.className = className;
	img.alt = alt;
	return img;
};
