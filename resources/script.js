// Game score variables

let playerScore = 0;
let computerScore = 0;
let round = 0;
let overallScore = { player: 0, computer: 0 };

let overallPlayerSpan = document.querySelector(".player-score");
let overallComputerSpan = document.querySelector(".computer-score");
const historyList = document.querySelector(".history-list");

function computerPlay() {
	let play = "";

	switch (Math.floor(Math.random() * 3 + 1)) {
		case 1:
			play = "rock";
			break;
		case 2:
			play = "paper";
			break;
		case 3:
			play = "scissors";
			break;
	}

	return play;
}

function playRound(playerSelection, computerSelection) {
	if (typeof playerSelection == "string") {
		let playerPlay = playerSelection.toLowerCase();
		let computerPlay = computerSelection;

		const rock = "rock";
		const scissors = "scissors";
		const paper = "paper";

		if (playerPlay == computerPlay) {
			return { winner: "tie", play: playerPlay };
		} else if (
			(computerPlay == rock && playerPlay == scissors) ||
			(computerPlay == scissors && playerPlay == paper) ||
			(computerPlay == paper && playerPlay == rock)
		) {
			return {
				winner: "computer",
				winnerPlay: computerPlay,
				loserPlay: playerPlay,
			};
		} else if (
			(playerPlay == rock && computerPlay == scissors) ||
			(playerPlay == scissors && computerPlay == paper) ||
			(playerPlay == paper && computerPlay == rock)
		) {
			return {
				winner: "player",
				winnerPlay: playerPlay,
				loserPlay: computerPlay,
			};
		}
	}
}

function game() {
	if ((playerScore || computerScore) <= 2) {
		let computerSelection = computerPlay();
		let playerSelection = this.id;
		let liElement = document.createElement("li");
		let playerSelectDOM = document.getElementById(`${playerSelection}`);
		let computerSelectDOM = document.getElementById(
			`computer-${computerSelection}`
		);

		playerSelectDOM.classList.add("player-selection");
		computerSelectDOM.classList.add("computer-selection");

		setTimeout(function () {
			playerSelectDOM.classList.remove("player-selection");
			computerSelectDOM.classList.remove("computer-selection");
		}, 2000);

		let roundPlayed = playRound(playerSelection, computerSelection);

		switch (roundPlayed.winner) {
			case "tie":
				liElement.innerHTML = `round ${round} is a tie, score is ${playerScore} - ${computerScore}`;
				historyList.insertBefore(liElement, historyList.childNodes[0]);
				break;
			case "player":
				playerScore += 1;
				liElement.innerHTML = `${roundPlayed.winnerPlay} beats ${roundPlayed.loserPlay}. ${roundPlayed.winner} wins round ${round}, score is ${playerScore} - ${computerScore}`;
				historyList.insertBefore(liElement, historyList.childNodes[0]);
				break;
			case "computer":
				computerScore += 1;
				liElement.innerHTML = `${roundPlayed.winnerPlay} beats ${roundPlayed.loserPlay}. ${roundPlayed.winner} wins round ${round}, score is ${playerScore} - ${computerScore}`;
				historyList.insertBefore(liElement, historyList.childNodes[0]);
				break;
		}
		round += 1;
	}
}

function resetGame() {
	playerScore = 0;
	computerScore = 0;
	round = 0;
}

setInterval(function checkWinner() {
	let liElement = document.createElement("li");

	if (playerScore == 3) {
		overallScore.player += 1;
		liElement.innerHTML = `Player wins overall score is ${overallScore.player} - ${overallScore.computer}`;
		liElement.classList.add("player-win");
		historyList.insertBefore(liElement, historyList.childNodes[0]);
		overallPlayerSpan.innerHTML = overallScore.player;
		resetGame();
	} else if (computerScore == 3) {
		overallScore.computer += 1;
		liElement.innerHTML = `Computer wins overall score is ${overallScore.player} - ${overallScore.computer}`;
		liElement.classList.add("computer-win");
		historyList.insertBefore(liElement, historyList.childNodes[0]);
		overallComputerSpan.innerHTML = overallScore.computer;
		resetGame();
	}
}, 1000);

// Event Listeners

// Player
document.querySelector("#rock").addEventListener("click", game);
document.querySelector("#paper").addEventListener("click", game);
document.querySelector("#scissors").addEventListener("click", game);

// Computer
document.querySelector("#computer-rock");
document.querySelector("#computer-paper");
document.querySelector("#computer-scissors");
