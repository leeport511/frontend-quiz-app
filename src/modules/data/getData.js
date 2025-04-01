const getData = async () => {
	const resp = await fetch('public/data/data.json');
	const json = await resp.json();

	return json;
};

export { getData };
