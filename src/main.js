document.addEventListener('DOMContentLoaded', () => {
	renderHome();
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
