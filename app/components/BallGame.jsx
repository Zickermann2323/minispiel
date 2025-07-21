import React, { useEffect, useRef, useState } from 'react';
import './BallGame.css';

const BallGame = () => {
  const canvasRef = useRef(null);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [dx, setDx] = useState(2);
  const [dy, setDy] = useState(2);
  const radius = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = '#3498db';
      context.fill();
      context.closePath();

      let newX = x + dx;
      let newY = y + dy;

      if (newX + radius > canvas.width || newX - radius < 0) setDx(-dx);
      if (newY + radius > canvas.height || newY - radius < 0) setDy(-dy);

      setX(newX);
      setY(newY);
    };

    const interval = setInterval(draw, 16);
    return () => clearInterval(interval);
  }, [x, y, dx, dy]);

  return (
    <div className="ball-game-container">
      <h1>Hallo Welt: Ball Game</h1>
      <canvas ref={canvasRef} width={300} height={300} />
    </div>
  );
};

export default BallGame;
