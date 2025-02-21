document.addEventListener('DOMContentLoaded', async () => {
	renderHome();

	const subjectsContainer = document.querySelector(
		'.quiz__subject-selector'
	);

	const { quizzes } = await getData();

	quizzes.forEach((quiz) => {
		const divTitle = document.createElement('p');
		divTitle.textContent = quiz.title;
		subjectsContainer.appendChild(divTitle);
		console.log(quiz.title);
	});
});

const renderHome = () => {
	const app = document.getElementById('app');

	app.innerHTML = `

    <section class="quiz">
      <div class="quiz__title">
        <h1>Welcome to the <b>Frontend Quiz!</b></h1>
        <p>Pick a subject to get started.</p>
      </div>

      <div class="quiz__subject-selector"></div>
    </section>
  `;
};

const getData = async () => {
	const resp = await fetch('/src/data/data.json');
	const json = await resp.json();

	return json;
};
