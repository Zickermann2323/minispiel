import React, { useState, useRef } from 'react';
import './BallGame.css';

export default function BallGame() {
  const [targetIndex, setTargetIndex] = useState(null);
  const [showTarget, setShowTarget] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [positions, setPositions] = useState([
    { top: 100, left: 100 },
    { top: 100, left: 300 },
    { top: 300, left: 100 },
    { top: 300, left: 300 },
  ]);
  const [canGuess, setCanGuess] = useState(false);
  const [result, setResult] = useState('');
  const intervalRef = useRef(null);

  const moveBalls = () => {
    setPositions(() =>
      Array.from({ length: 4 }, () => ({
        top: Math.random() * 300 + 50,
        left: Math.random() * 300 + 50,
      }))
    );
  };

  const startGame = () => {
    if (gameStarted) return;
    setShowTarget(false);
    setGameStarted(true);
    setResult('');
    moveBalls();
    intervalRef.current = setInterval(moveBalls, 500);

    setTimeout(() => {
      clearInterval(intervalRef.current);
      setGameStarted(false);
      setCanGuess(true);
    }, 15000);
  };

  const handleGuess = (index) => {
    if (!canGuess) return;
    setResult(index === targetIndex ? '🎉 Richtig!' : '❌ Falsch!');
    setCanGuess(false);
  };

  const revealTarget = () => {
    if (gameStarted) return;
    const randomIndex = Math.floor(Math.random() * 4);
    setTargetIndex(randomIndex);
    setShowTarget(true);
    setResult('');
  };

  return (
    <div className="game-container">
      <div className="controls">
        <button onClick={revealTarget} disabled={gameStarted}>
          Show Target
        </button>
        <button onClick={startGame} disabled={gameStarted || targetIndex === null}>
          Start
        </button>
      </div>

      <div className="play-area">
        {positions.map((pos, i) => (
          <div
            key={i}
            className="ball"
            onClick={() => handleGuess(i)}
            style={{
              top: pos.top,
              left: pos.left,
              backgroundColor: showTarget && i === targetIndex ? 'red' : 'blue',
            }}
          />
        ))}
      </div>

      {result && <div className="result">{result}</div>}
    </div>
  );
}
