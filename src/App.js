import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game-board">
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [playerEmail, setPlayerEmail] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [playerGender, setPlayerGender] = useState('');
  const [preference, setPreference] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function startGame(event) {
    event.preventDefault();
    if (playerName && playerEmail && playerAge && playerGender && preference) {
      setGameStarted(true);
    } else {
      alert("Please enter all details");
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  return (
    <div className="container">
      <h1>Tic-Tac-Toe Game - Anju Baby_24250712</h1>
      <div className="game-container">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div className="game-info">
          <ol>
            {history.map((_, move) => (
              <li key={move}>
                <button onClick={() => jumpTo(move)}>
                  {move > 0 ? `Go to move #${move}` : "Go to game start"}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="form-container">
          <h2>Player Details</h2>
          <form onSubmit={startGame}>
            <label>
              Name:
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} required />
            </label>
            <label>
              Email:
              <input type="email" value={playerEmail} onChange={(e) => setPlayerEmail(e.target.value)} required />
            </label>
            <label>
              Age:
              <input type="number" value={playerAge} onChange={(e) => setPlayerAge(e.target.value)} required />
            </label>
            <label>
              Gender:
              <select value={playerGender} onChange={(e) => setPlayerGender(e.target.value)} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Preference:
              <div>
                <input type="radio" value="X" name="preference" onChange={(e) => setPreference(e.target.value)} required /> X
                <input type="radio" value="O" name="preference" onChange={(e) => setPreference(e.target.value)} required /> O
              </div>
            </label>
            <button type="submit">Start Game</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
