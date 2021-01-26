let playerScore = 0;
let computerScore = 0;
let round = 0;
let overallScore = { player: 0, computer: 0 };

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
		let roundPlayed = playRound(playerSelection, computerSelection);

		switch (roundPlayed.winner) {
			case "tie":
				console.log(
					`round ${round} is tied, score is ${playerScore} - ${computerScore}`
				);
				break;
			case "player":
				playerScore += 1;
				console.log(
					`${roundPlayed.winnerPlay} beats ${roundPlayed.loserPlay}. ${roundPlayed.winner} wins round ${round}, score is ${playerScore} - ${computerScore}`
				);
				break;
			case "computer":
				computerScore += 1;
				console.log(
					`${roundPlayed.winnerPlay} beats ${roundPlayed.loserPlay}. ${roundPlayed.winner} wins round ${round}, score is ${playerScore} - ${computerScore}`
				);
				break;
		}
		round += 1;
	}
}

setInterval(function checkWinner() {
	if (playerScore == 3) {
		overallScore.player += 1;
		console.log(
			`Player wins overall score is ${overallScore.player} - ${overallScore.computer}`
		);
		playerScore = 0;
		computerScore = 0;
		round = 0;
		console.log("game reseted..");
	} else if (computerScore == 3) {
		overallScore.computer += 1;
		console.log(
			`Computer wins overall score is ${overallScore.player} - ${overallScore.computer}`
		);
		playerScore = 0;
		computerScore = 0;
		round = 0;
		console.log("game reseted..");
	}
}, 1000);

// Event Listeners

// Player
document.querySelector("#rock").addEventListener("click", game);
document.querySelector("#paper").addEventListener("click", game);
document.querySelector("#scissors").addEventListener("click", game);

// Computer
document.querySelector("#computer-rock").addEventListener("click", () => {});
document.querySelector("#computer-paper").addEventListener("click", () => {});
document
	.querySelector("#computer-scissors")
	.addEventListener("click", () => {});
