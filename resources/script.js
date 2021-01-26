// Game score variables

let playerScore = 0;
let computerScore = 0;
let round = 0;
let overallScore = { player: 0, computer: 0 };

// DOM selectors

const overallPlayerSpan = document.querySelector(".player-score");
const overallComputerSpan = document.querySelector(".computer-score");
const historyList = document.querySelector(".history-list");

// Choses a random play between the three options

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

// Receives two plays and decides the winner of the round

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

// Plays the game if the Bo5 has not been decided

function game() {
	if ((playerScore || computerScore) <= 2) {
		// Random computer play
		let computerSelection = computerPlay();
		// Player play is decided by the button calling the function
		let playerSelection = this.id;

		let liElement = document.createElement("li");

		//  Displays the selections made for 2 seconds
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

		// Plays the round
		let roundPlayed = playRound(playerSelection, computerSelection);

		// Updates the socre and the history logs
		switch (roundPlayed.winner) {
			case "tie":
				liElement.innerHTML = `round ${round} is a tie, both played ${roundPlayed.play}`;
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

// Resets the Bo5

function resetGame() {
	playerScore = 0;
	computerScore = 0;
	round = 0;
}

// Checks for a Bo5 winner

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

// Computer vs Computer Simulation

let simRunning = false;
const simButton = document.querySelector(".simulation-start");
const playerNameSpan = document.querySelector(".player-name");
const runAnimation = document.querySelector(".sim-running");

// Runs the simulation if it's not running, stops if it is.
// making a play for the player every 3 seconds

function simGame() {
	if (!simRunning) {
		intervalID = setInterval(() => {
			let simPlayerSelection = computerPlay();
			playerNameSpan.innerHTML = "Computer";
			document.querySelector(`#${simPlayerSelection}`).click();
		}, 3000);
		simButton.innerHTML = "Stop Simulation";
		runAnimation.style.display = "inline-block";
		simRunning = true;
	} else {
		stopSimGame();
	}
}

// Stops the simulation

function stopSimGame() {
	clearInterval(intervalID);
	playerNameSpan.innerHTML = "Player";
	simButton.innerHTML = "Run Simulation";
	runAnimation.style.display = "none";
	simRunning = false;
	resetGame();
}

// Makes an animation with 3 dots (...)

var el = runAnimation,
	i = 0,
	load = setInterval(function () {
		i = ++i % 4;
		el.innerHTML = "Simulation Running " + Array(i + 1).join(".");
	}, 1000);

// Event Listeners

document.querySelector("#rock").addEventListener("click", game);
document.querySelector("#paper").addEventListener("click", game);
document.querySelector("#scissors").addEventListener("click", game);
simButton.addEventListener("click", simGame);
