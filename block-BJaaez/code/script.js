function main() {
	const root = document.querySelector(".todo-list");
	const input = document.querySelector("input");
	const nav = document.querySelector(".nav");
	const filter = ["All", "Active", "Completed", "Clear Completed"];

	let moviesList = JSON.parse(localStorage.getItem("moviesList")) || [];

	function navHandler(e) {
		[...nav.children].forEach((k) => k.classList.remove("active"));
		if (e.target.innerText == "Active") {
			createUI(moviesList.filter((i) => !i.isCompleted));
			e.target.classList.add("active");
		} else if (e.target.innerText == "Completed") {
			createUI(moviesList.filter((i) => i.isCompleted));
			e.target.classList.add("active");
		} else if (e.target.innerText == "Clear Completed") {
			moviesList = moviesList.filter((i) => i.isCompleted !== true);
			createUI(moviesList);
			nav.children[0].classList.add("active");
			if (moviesList.length === 0) [...nav.children].forEach((k) => k.remove());
		} else {
			createUI(moviesList);
			nav.children[0].classList.add("active");
		}
		localStorage.setItem("moviesList", JSON.stringify(moviesList));
	}

	function createNav() {
		nav.innerHTML = "";
		if (moviesList.length > 0) {
			nav.addEventListener("click", navHandler);
			filter.forEach((i) => {
				const li = document.createElement("li");
				li.classList.add("nav-item");
				li.textContent = i;
				nav.appendChild(li);
			});
		}
	}

	function createUI(data) {
		root.innerHTML = "";
		data.forEach((e, i) => {
			const li = document.createElement("li");
			const span = document.createElement("span");
			const input = document.createElement("input");
			const label = document.createElement("label");
			input.type = "checkbox";
			input.checked = e.isCompleted;
			label.innerText = e.todo;
			li.setAttribute("data-id", i);
			li.append(input, label, span);
			root.append(li);
		});
	}

	function todoHandler(e) {
		const index = e.target.parentElement.dataset.id;
		if (e.target.tagName == "INPUT") {
			moviesList[index].isCompleted = e.target.checked ? true : false;
		}

		if (e.target.tagName === "SPAN") {
			moviesList.splice(index, 1);
			createUI(moviesList);
		}
		createNav();
		if (nav.children.length > 0) nav.children[0].classList.add("active");
		localStorage.setItem("moviesList", JSON.stringify(moviesList));
		console.log(moviesList);
	}

	function handler(e) {
		if (!e.target.value.trim()) {
			e.target.value = "";
			return;
		}
		const todoObj = {};
		todoObj.todo = e.target.value;
		todoObj.isCompleted = false;
		moviesList.push(todoObj);
		console.log(moviesList);
		e.target.value = "";
		localStorage.setItem("moviesList", JSON.stringify(moviesList));
		createUI(moviesList);
		createNav();
		nav.children[0].classList.add("active");
	}

	input.addEventListener("change", handler);
	root.addEventListener("click", todoHandler);

	createUI(moviesList);
	createNav();
	if (nav.children.length > 0) nav.children[0].classList.add("active");
}

main();
