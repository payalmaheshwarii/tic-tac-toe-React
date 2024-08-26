import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import GameOver from './components/GameOver'
import { useState } from 'react'
import { WINNING_COMBINATIONS } from './winning-combinations';
const INITIAL_BOARD = [[null, null, null], [null, null, null], [null, null, null]];
const PLAYERS = {
  "X": "Player 1",
  "O": "Player 2"
}

function App() {

  const [turns, setTurns] = useState([]);
  let isDraw = null;
  const [playerName, setPlayerName] = useState(PLAYERS)
  let gameBoard = [...INITIAL_BOARD.map(array => [...array])];

  //Helper functions below
  function handleRematch(gameBoard) {
    gameBoard = [...INITIAL_BOARD.map(array => [...array])];
    setTurns([]);
  }

  function handlePlayerChange(symbol, newName) {
    setPlayerName(oldNames => {
      return {
        ...oldNames,
        [symbol]: newName
      }
    })
  }

  function handleActivePlayer(rowInd, colInd) {
    setTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{
        "player": currentPlayer, "square": {
          "row": rowInd,
          "col": colInd
        }
      }, ...prevTurns];

      return updatedTurns;
    })
  }

  function deriveActivePlayer(turns) {
    let currentPlayer = 'X';
    if (turns.length > 0 && turns[0].player === 'X') {
      currentPlayer = 'O'
    }
    return currentPlayer;
  }

  function updateGameBoard(turns) {
    for (const turn of turns) {
      const { player, square } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }
    return gameBoard;
  }

  function deriveWinner(gameBoard) {
    let isWinner = null;
    for (const winningComb of WINNING_COMBINATIONS) {
      const firstOption = gameBoard[winningComb[0].row][winningComb[0].column]
      const secondOption = gameBoard[winningComb[1].row][winningComb[1].column]
      const thirdOption = gameBoard[winningComb[2].row][winningComb[2].column]
  
      if (firstOption && firstOption == secondOption && firstOption == thirdOption) {
        isWinner = firstOption;
      }
    }
    return isWinner;
  }

  const currentActive = deriveActivePlayer(turns);
  gameBoard = updateGameBoard(turns)
  const isWinner = deriveWinner(gameBoard);
  if (turns.length == 9) isDraw = true;
  
  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player initialName='Player 1' symbol='X' isActive={currentActive === 'X'} handlePlayerChange={handlePlayerChange} />
          <Player initialName='Player 2' symbol='O' isActive={currentActive === 'O'} handlePlayerChange={handlePlayerChange} />
        </ol>

        {(isWinner || isDraw) && <GameOver isDraw={isDraw} player={currentActive === 'X' ? playerName['O'] : playerName['X']} handleRematch={handleRematch} />}
        {!isWinner && <GameBoard handleActive={handleActivePlayer} board={gameBoard} />}
      </div>
      <Log turns={turns} />
    </main>
  )
}
export default App