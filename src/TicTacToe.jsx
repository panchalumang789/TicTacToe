import React, { useState } from "react";

const Square = ({ value, onSquareClick }) => {
  return (
    <button key={value} className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

const Board = ({ xIsNext, squares, onPlay }) => {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner is : ${winner[0]}`;
  } else {
    status = `Next Player : ${xIsNext ? "X" : "O"}`;
  }

  function check(arr) {
    return arr.some((el) => el === null);
  }
  if (check(squares) === false && !winner) {
    status = "Match is tied";
  }

  const handleClick = (index) => {
    if (calculateWinner[squares] || squares[index]) return;

    const nextSquare = squares.slice();
    if (xIsNext) nextSquare[index] = "X";
    else nextSquare[index] = "O";

    onPlay(nextSquare);
  };

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {squares.map((item, index) => {
          return (
            <Square
              key={index}
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
            />
          );
        })}
      </div>
    </>
  );
};

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(a, b, c);
      return [squares[a], a, b, c];
    }
  }
  return null;
}

const TicTacTow = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jupTo(jumpMove) {
    setCurrentMove(jumpMove);
  }

  const move = history.map((squares, index) => {
    let description;
    if (index > 0) description = `Goto move ${index}`;
    else description = "Go to game start";
    return (
      <li key={index}>
        <button
          onClick={() => {
            jupTo(index);
          }}
        >
          {description}
        </button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{move}</ol>
      </div>
    </div>
  );
};
export default TicTacTow;
