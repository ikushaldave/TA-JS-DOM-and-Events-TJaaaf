const form = document.querySelector("form");
const wrapper = document.querySelector(".wrapper");
const formData = {};

function formHandler(e) {
	e.preventDefault();
	[...e.target.elements].forEach((i) => {
		formData[i.name] = i.type == "checkbox" ? i.checked : i.value;
	});

	createModal();
}

form.addEventListener("submit", formHandler);

function createModal() {
	const modal = document.createElement("div");
	const name = document.createElement("h1");
	const email = document.createElement("h2");
	const color = document.createElement("h2");
	const rating = document.createElement("h2");
	const genre = document.createElement("h2");
	const terms = document.createElement("h2");
	const close = document.createElement("p");

	name.innerText = "Name: " + formData.name;
	email.innerText = "Email: " + formData.email;
	color.innerText = "Color: " + formData.color;
	rating.innerText = "Rating: " + formData.rating;
	genre.innerText = "Genre: " + formData.genre;
	terms.innerText = terms ? "Terms: 😎 You agree the Terms & Condition" : "Terms: 😪 You don't agree the Terms & Condition";
	close.innerText = "Close";

	modal.classList.add("container");
	close.classList.add("btn");

	modal.append(name, email, color, rating, genre, terms, close);
	wrapper.append(modal);

	form.style.display = "none";
	close.addEventListener("click", () => {
		form.style.display = "flex";
		modal.style.display = "none";
	});
}
