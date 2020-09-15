const boxFirst = document.querySelector(".first");
const boxSecond = document.querySelector(".second");

function handler(e) {
	const R = Math.round(Math.random() * 255);
	const G = Math.round(Math.random() * 255);
	const B = Math.round(Math.random() * 255);
	const alpha = Number(Math.random().toFixed(2));

	e.currentTarget.style.backgroundColor = `rgba(${R}, ${G}, ${B}, ${alpha})`;
}

boxFirst.addEventListener("click", handler);
boxSecond.addEventListener("mousemove", handler);
