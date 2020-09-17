const boxes = document.querySelectorAll(".boxes");

// Without Event Deligation

function withoutDelegationHandler(e, i) {
	e.style.transform = `rotateY(360deg)`;
	e.innerText = `${i + 1}`;
	setTimeout(() => {
		e.style.transform = `rotateY(180deg)`;
		e.innerText = "";
	}, 5000);
}

[...boxes[0].children].forEach((e, i) => {
	e.addEventListener("click", function () {
		withoutDelegationHandler(e, i);
	});
});

// With Event Deligation

function withEventDelegationHandler(e) {
	if (e.target === e.currentTarget) return;
	const i = [...e.currentTarget.children].indexOf(e.target);
	e.target.style.transform = `rotateY(360deg)`;
	e.target.innerText = `${i + 1}`;
	setTimeout(() => {
		e.target.style.transform = `rotateY(180deg)`;
		e.target.innerText = "";
	}, 5000);
}

boxes[1].addEventListener("click", withEventDelegationHandler);
