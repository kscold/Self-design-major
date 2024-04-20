import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(game) {
  let currentPlayer = 'X';

  if (game.length > 0 && game[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({ X: 'Player1', O: 'Player2' });
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])]; // 깊은 복사를 하여 불변성을 유지함

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winnner;

  // target 조합인지 검사하기 위한 symbol를 추출
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    // 첫번째 두번째 세번째 심볼이 전부 같은 기호일 때
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winnner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winnner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChage(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChage}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChage}
          />
        </ol>
        {(winnner || hasDraw) && (
          <GameOver winner={winnner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
