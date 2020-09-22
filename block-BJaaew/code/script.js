function main(houses) {
	const cards = document.querySelector(".cards");
	const ul = document.querySelector("ul");
	const input = document.querySelector(".search input");

	function houseName() {
		return houses.reduce((a, c) => {
			a.push(c.name);
			return a;
		}, []);
	}

	function peopleNames() {
		return houses.reduce((a, c) => {
			a.push(...c.people);
			return a;
		}, []);
	}

	function filterCards(filterData) {
		const data = houses.filter((e) => e.name == filterData);
		createUI(data);
	}

	function createListItemUI() {
		houseName().forEach((e) => {
			const li = document.createElement("li");
			li.innerText = e;
			ul.append(li);
		});
	}

	function createCard(data) {
		data.forEach((e) => {
			const box = document.createElement("div");
			const img = document.createElement("img");
			const name = document.createElement("h2");
			const description = document.createElement("p");
			const link = document.createElement("a");

			img.src = e.image;
			name.textContent = e.name;
			description.textContent = e.description;
			link.href = e.wikiLink;
			link.innerText = "Learn More!";

			box.classList.add("box");

			box.append(img, name, description, link);
			cards.append(box);
		});
	}

	function createUI(data) {
		cards.innerHTML = "";
		data.forEach((house) => {
			createCard(house.people);
		});
	}

	function handler(e) {
		[...e.currentTarget.children].forEach((i) => {
			if (i.classList.contains("active")) i.classList.remove("active");
		});
		if (e.target.innerText == "All") {
			e.target.classList.add("active");
			createUI(houses);
		} else if (e.target.tagName == "LI" && e.target.innerText !== "ALL") {
			e.target.classList.add("active");
			filterCards(e.target.innerText);
		}
	}

	function inputHandler(e) {
		cards.innerHTML = "";
		let data = peopleNames().filter((ele) => ele.name.toLowerCase().includes(e.target.value.toLowerCase()));
		createCard(data);
	}

	ul.addEventListener("click", handler);
	input.addEventListener("input", inputHandler);

	createListItemUI();
	createUI(houses);
	ul.children[0].classList.add("active");
	console.log(peopleNames());
}

main(got.houses);
