import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    checkWinner(newBoard);
    setIsXNext(!isXNext);
  };

  const checkWinner = (board) => {
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

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setIsGameOver(true);
        return;
      }
    }

    if (board.every((cell) => cell !== null)) {
      setWinner('draw');
      setIsGameOver(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsGameOver(false);
  };

  return (
    <div className="App">
      <div className={`msg-container ${winner || isGameOver ? '' : 'hide'}`}>
        <p id="msg">
          {winner === 'draw' ? 'It\'s a Draw!' : winner ? `Winner: ${winner}` : ''}
        </p>
        <button id="new-btn" onClick={resetGame}>New Game</button>
      </div>
      <main>
        <h1>Tic Tac Toe</h1>
        <div className="container">
          <div className="game">
            {board.map((cell, index) => (
              <button
                key={index}
                className="box"
                onClick={() => handleClick(index)}
              >
                {cell}
              </button>
            ))}
          </div>
        </div>
        <button id="reset-btn" onClick={resetGame}>Reset Game</button>
      </main>
    </div>
  );
}

export default App;
