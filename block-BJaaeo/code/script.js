const output = document.querySelector(".output");
const buttons = document.querySelector(".buttons");

function handler(e) {
	if (e.target == e.currentTarget) return;

	if (e.target.hasAttribute("data-number")) {
		output.innerText = output.innerText + e.target.dataset.number;
	} else if (e.target.hasAttribute("data-operation")) {
		output.innerText = output.innerText + e.target.dataset.operation;
	} else if (e.target.classList.contains("eval")) {
		output.innerText = `${eval(output.innerText)}`;
	} else {
		output.innerText = "";
	}
}

buttons.addEventListener("click", handler);
