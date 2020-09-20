(function () {
	const container = document.querySelector(".container");
	const wrapper = document.querySelector(".wrapper");
	const modal = document.querySelector(".modal");
	const move = document.querySelector(".move");
	const timer = document.querySelector(".timer");
	const restart = document.querySelector(".fa-redo");

	let cards = ["fa-tired", "fa-surprise", "fa-smile-wink", "fa-smile-beam", "fa-sad-tear", "fa-sad-cry", "fa-kiss-wink-heart", "fa-grin-tongue-wink", "fa-tired", "fa-surprise", "fa-smile-wink", "fa-smile-beam", "fa-sad-tear", "fa-sad-cry", "fa-kiss-wink-heart", "fa-grin-tongue-wink"];
	let evenSelected = null;
	let oddSelected = null;
	let clicked = 1;
	let gameOver = false;
	let moves = 0;
	let min = 0;
	let sec = 0;
	let interval = null;

	function modalUI(m, minute, second) {
		const div = document.createElement("div");
		div.innerHTML = `
		<div>${document.querySelector(".lifes").innerHTML}</div>
		<h2>You Had Completed a Game at ${m} in ${minute}:${second} s</h2>
		<a class="btn">Play Again</a>
	`;
		modal.classList.add("modal-overlay");
		modal.append(div);

		document.querySelector(".btn").addEventListener("click", function () {
			modal.innerHTML = "";
			modal.classList.remove("modal-overlay");
			restartHandler();
		});
	}

	function createUI(data) {
		wrapper.innerHTML = "";
		data.forEach((e) => {
			const div = document.createElement("div");
			div.classList.add("box");
			div.style.transform = `rotateY(180deg)`;
			div.setAttribute("data-face", e);
			div.addEventListener("click", boxHandler);
			wrapper.append(div);
		});
	}

	function shuffle(cards) {
		const shuffleCards = [];
		const randomList = [];
		let isContain = false;
		randomList.push(Math.floor(Math.random() * 16));

		while (randomList.length !== cards.length) {
			const random = Math.floor(Math.random() * 16);
			randomList.forEach((i) => {
				if (random === i) {
					isContain = true;
				}
			});
			if (!isContain) {
				randomList.push(random);
			}
			isContain = false;
		}
		for (let i = 0; i < randomList.length; i++) {
			shuffleCards.push(cards[randomList[i]]);
		}

		cards = shuffleCards;
		return cards;
	}

	function restartHandler() {
		window.location.reload();
	}

	function gameLogic() {
		//  Remove Event Listerner from other box
		document.querySelectorAll(".box").forEach((e) => {
			if (e !== oddSelected && e !== evenSelected) {
				e.removeEventListener("click", boxHandler);
			}
		});

		if (moves === 10) {
			document.querySelector(".life:last-child").remove();
		} else if (moves === 15) {
			document.querySelector(".life:last-child").remove();
		}

		// Game Logic
		if (evenSelected.dataset.face === oddSelected.dataset.face) {
			evenSelected.innerHTML = `<i class="fal ${evenSelected.dataset.face}"><i>`;
			evenSelected.style.transform = `rotateY(360deg)`;
			oddSelected.classList.add("success");
			evenSelected.classList.add("success");

			// It add back an event Listener
			document.querySelectorAll(".box").forEach((e) => {
				e.addEventListener("click", boxHandler);
			});
		} else {
			evenSelected.innerHTML = `<i class="fal ${evenSelected.dataset.face}"><i>`;
			evenSelected.style.transform = `rotateY(360deg)`;

			setTimeout(() => {
				evenSelected.style.transform = `rotateY(180deg)`;
				evenSelected.innerHTML = "";
				oddSelected.style.transform = `rotateY(180deg)`;
				oddSelected.innerHTML = "";
				document.querySelectorAll(".box").forEach((e) => {
					e.addEventListener("click", boxHandler);
				});
			}, 1000);
		}

		gameOver = [...document.querySelectorAll(".box")].every((i) => i.classList.contains("success"));
		if (gameOver) {
			modalUI(moves, min, sec);
		}
	}

	function boxHandler(e) {
		if (e.target.style.transform === "rotateY(180deg)") {
			e.target.innerHTML = `<i class="fal ${e.target.dataset.face}"></i>`;
			e.target.style.transform = `rotateY(360deg)`;
			if (clicked % 2 == 0) {
				evenSelected = e.target;
				gameLogic();
				moves++;
				move.textContent = moves;
			} else {
				oddSelected = e.target;
			}
			clicked++;
			e.target.removeEventListener("click", boxHandler);
		}
	}

	function timeHandler(e) {
		if (e.target.classList.contains("box")) {
			interval = setInterval(() => {
				sec++;
				if (sec % 59 == 0) {
					min++;
					sec = 0;
				}
				timer.innerText = `${min}:${sec} s`;
			}, 1000);
		}
		wrapper.removeEventListener("click", timeHandler);
	}

	createUI(shuffle(cards));

	restart.addEventListener("click", restartHandler);
	wrapper.addEventListener("click", timeHandler);
})();
