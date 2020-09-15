const boxes = document.querySelector(".boxes");

for (let i = 0; i < 500; i++) {
	const div = document.createElement("div");
	div.classList.add("box");
	div.textContent = `${Math.round(Math.random() * 500)}`;
	boxes.append(div);
}

const boxList = document.querySelectorAll(".box");

function handler() {
	boxList.forEach((e) => {
		e.textContent = `${Math.round(Math.random() * 500)}`;
		e.style.backgroundColor = `#${Math.round(Math.random() * 1000)}`;
	});
}

boxes.addEventListener("mousemove", handler);
