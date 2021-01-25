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
	let playerScore = 0;
	let computerScore = 0;
	let round = 0;
	console.log("game started");

	while (playerScore < 3 && computerScore < 3) {
		let computerSelection = computerPlay();
		let playerSelection = computerPlay();
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
