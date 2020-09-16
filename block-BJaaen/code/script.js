(function () {
	const userScore = document.querySelector(".userScore");
	const userSelect = document.querySelector(".user-selected");
	const computerScore = document.querySelector(".computerScore");
	const computerSelect = document.querySelector(".computer-selected");
	const result = document.querySelector(".result");
	const userPickingList = document.querySelector(".user-picked");
	const computerPickingList = [...document.querySelector(".computer-picked").children];
	const redo = document.querySelector(".redo");

	function gameLogic(u, c) {
		if (u === c) {
			result.innerText = `It's a tie 👊🏽.`;
		} else if ((u === "scissors" && c === "paper") || (u === "paper" && c === "rock") || (u === "rock" && c === "lizard") || (u === "lizard" && c === "spock") || (u === "spock" && c === "scirrors") || (u === "scissors" && c === "lizard") || (u === "lizard" && c === "paper") || (u === "paper" && c === "spock") || (u === "spock" && c === "rock") || (u === "rock" && c === "scissors")) {
			userScore.innerText = Number(userScore.innerText) + 1;
			result.innerText = `You Won 😎`;
		} else {
			computerScore.innerText = Number(computerScore.innerText) + 1;
			result.innerText = `You Lost 😢`;
		}
	}

	function handler(e) {
		const userPicked = e.target.dataset.picked;
		if (!userPicked) return;
		result.innerText = ``;
		const computerPicked = computerPickingList[Math.floor(Math.random() * computerPickingList.length)].dataset.picked;

		userSelect.innerText = `--- ${userPicked}`;
		computerSelect.innerText = `--- ${computerPicked}`;

		gameLogic(userPicked, computerPicked);
	}

	redo.addEventListener("click", function () {
		userScore.innerText = "0";
		computerScore.innerText = "0";
		result.innerText = "";
		userSelect.innerText = "";
		computerSelect.innerText = "";
	});

	userPickingList.addEventListener("click", handler);
})();
