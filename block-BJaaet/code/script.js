function main() {
	const root = document.querySelector(".movies-list");
	const input = document.querySelector("input");

	let moviesList = JSON.parse(localStorage.getItem("moviesList")) || [];

	function createUI() {
		root.innerHTML = "";
		moviesList.forEach((value, i) => {
			const li = document.createElement("li");
			const span = document.createElement("span");
			li.innerText = value;
			li.setAttribute("data-id", i);
			li.append(span);
			root.append(li);
		});
	}

	function deleteHandler(e) {
		if (e.target.tagName === "SPAN") {
			const index = e.target.dataset.id;
			moviesList.splice(index, 1);
			localStorage.setItem("moviesList", JSON.stringify(moviesList));
			createUI();
		}
	}

	function handler(e) {
		moviesList.push(e.target.value);
		e.target.value = "";
		localStorage.setItem("moviesList", JSON.stringify(moviesList));
		createUI();
	}

	input.addEventListener("change", handler);
	root.addEventListener("click", deleteHandler);

	createUI();
}

main();
