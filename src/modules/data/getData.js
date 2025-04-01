const getData = async () => {
	const resp = await fetch('/data/data.json');
	if (!resp.ok)
		throw new Error(`HTTP error! status: ${resp.status}`);

	const json = await resp.json();

	return json;
};

export { getData };
