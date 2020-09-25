const boxes = document.querySelectorAll(".boxes");

// Without Event Deligation

function handler(e, i) {
	if (e.target.classList.contains("box")) {
		e.target.style.transform = `rotateY(360deg)`;
		e.target.innerText = `${i + 1}`;
		setTimeout(() => {
			e.target.style.transform = `rotateY(180deg)`;
			e.target.innerText = "";
		}, 5000);
	}
}

[...boxes[0].children].forEach((e, i) => {
	e.addEventListener("click", function (e) {
		handler(e, i);
	});
});

// With Event Deligation

boxes[1].addEventListener("click", function (e) {
	handler(e, [...e.currentTarget.children].indexOf(e.target));
});
