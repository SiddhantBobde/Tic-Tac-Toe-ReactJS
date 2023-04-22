import { useState } from 'react';
import './App.css';

function App() {
	const player1 = 'X';
	const player2 = 'O'

	const [currentPlayer, setCurrentPlayer] = useState(player1);
	const [currentBoard, setCurrentBoard] = useState([]);
	const [winner, setWinner] = useState('');
	const [noOfPlays, setNoOfPlays] = useState(0);

	const updateCurrentPlayer = () => {
		if (currentPlayer === player1) {
			setCurrentPlayer(player2);
		} else {
			setCurrentPlayer(player1)
		}
	}

	const checkWinForPlayer = (player) => {
		if ([currentBoard[0], currentBoard[1], currentBoard[2]].every(play => play === player))
			return true;
		else if ([currentBoard[3], currentBoard[4], currentBoard[5]].every(play => play === player))
			return true;
		else if ([currentBoard[6], currentBoard[7], currentBoard[8]].every(play => play === player))
			return true;
		else if ([currentBoard[0], currentBoard[3], currentBoard[6]].every(play => play === player))
			return true;
		else if ([currentBoard[1], currentBoard[4], currentBoard[7]].every(play => play === player))
			return true;
		else if ([currentBoard[2], currentBoard[5], currentBoard[8]].every(play => play === player))
			return true;
		else if ([currentBoard[0], currentBoard[4], currentBoard[8]].every(play => play === player))
			return true;
		else if ([currentBoard[2], currentBoard[4], currentBoard[6]].every(play => play === player))
			return true;
		return false;
	}

	const checkForWin = (noOfPlays) => {
		if (checkWinForPlayer(player1)) {
			setWinner(`!!-----${player1} WON-----!!`);
		} else if (checkWinForPlayer(player2)) {
			setWinner(`!!-----${player2} WON-----!!`);
		} else if (noOfPlays === 9) {
			setWinner(`!!-----DRAW-----!!`);
		}
	}

	const updateCurrentBoard = (index) => {
		debugger;
		if (currentBoard[index] !== player1 && currentBoard[index] !== player2 && !winner) {
			currentBoard[index] = currentPlayer;
			setNoOfPlays(noOfPlays + 1);
			updateCurrentPlayer();
			setCurrentBoard(currentBoard);
			checkForWin(noOfPlays + 1);
		}
	}

	const renderGridBlocks = () => {
		let gridBlocks = [];
		for (let index = 0; index < 9; index++) {
			gridBlocks.push(
				<div key={index} className='grid-block' onClick={() => updateCurrentBoard(index)}>
					{currentBoard[index]}
				</div>
			)
		}
		return gridBlocks;
	}

	const renderGrid = () => {
		return <div className='grid'>
			{renderGridBlocks()}
		</div>
	}

	return <div className='container'>
		<div className="game-board">
			<div className='board-header'>
				<div>
					<h3 className={currentPlayer === player1 ? 'current-player' : ''}>Player 1: X</h3>
					<h3 className={currentPlayer === player2 ? 'current-player' : ''}>Player 2: O</h3>
				</div>
				<button
					className='reset-game-btn'
					onClick={() => {
						setCurrentPlayer(player1);
						setCurrentBoard([]);
						setWinner('');
						setNoOfPlays(0);
					}}>Reset</button>
			</div>
			{
				winner ?
					<h3>{winner}</h3>
					: ''
			}
			{renderGrid()}
		</div>
	</div>;
}

export default App;
