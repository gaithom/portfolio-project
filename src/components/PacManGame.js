import { useState, useEffect, useRef, useCallback } from "react";

// ── Pac-Man Game Component ───────────────────────────────────────────────────
export function PacManGame({ theme }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  
  // Game constants
  const CELL_SIZE = 20;
  const MAZE_WIDTH = 19;
  const MAZE_HEIGHT = 21;
  
  // Maze layout (1 = wall, 0 = pellet, 2 = empty, 3 = power pellet)
  const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,3,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,3,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,1,1,2,1,1,0,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,1,2,2,2,1,0,0,0,0,0,0,1],
    [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
    [1,3,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,3,1],
    [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ];
  
  const [gameState, setGameState] = useState({
    pacman: { x: 9, y: 15, dx: 0, dy: 0, nextDx: 0, nextDy: 0 },
    ghosts: [
      { x: 9, y: 9, dx: 1, dy: 0, color: "#FF0000", scared: false },
      { x: 8, y: 9, dx: -1, dy: 0, color: "#00FFFF", scared: false },
      { x: 10, y: 9, dx: 0, dy: 1, color: "#FFB8FF", scared: false },
      { x: 9, y: 10, dx: 0, dy: -1, color: "#FFB852", scared: false }
    ],
    pellets: [],
    powerPellets: [],
    powerMode: false,
    powerTimer: 0
  });
  
  // Initialize pellets
  useEffect(() => {
    const newPellets = [];
    const newPowerPellets = [];
    
    for (let y = 0; y < MAZE_HEIGHT; y++) {
      for (let x = 0; x < MAZE_WIDTH; x++) {
        if (maze[y][x] === 0) newPellets.push({ x, y });
        if (maze[y][x] === 3) newPowerPellets.push({ x, y });
      }
    }
    
    setGameState(prev => ({ ...prev, pellets: newPellets, powerPellets: newPowerPellets }));
  }, []);
  
  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const handleKeyPress = (e) => {
      const { pacman } = gameState;
      let newDx = 0, newDy = 0;
      
      switch(e.key) {
        case 'ArrowUp': newDy = -1; break;
        case 'ArrowDown': newDy = 1; break;
        case 'ArrowLeft': newDx = -1; break;
        case 'ArrowRight': newDx = 1; break;
        default: return;
      }
      
      // Check if the next move is valid
      const nextX = pacman.x + newDx;
      const nextY = pacman.y + newDy;
      
      if (nextX >= 0 && nextX < MAZE_WIDTH && nextY >= 0 && nextY < MAZE_HEIGHT && maze[nextY][nextX] !== 1) {
        setGameState(prev => ({
          ...prev,
          pacman: { ...prev.pacman, nextDx: newDx, nextDy: newDy }
        }));
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver, gameState.pacman]);
  
  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const gameInterval = setInterval(() => {
      setGameState(prev => {
        let newState = { ...prev };
        const { pacman, ghosts, pellets, powerPellets, powerMode, powerTimer } = prev;
        
        // Update Pac-Man position
        if (pacman.nextDx !== 0 || pacman.nextDy !== 0) {
          const nextX = pacman.x + pacman.nextDx;
          const nextY = pacman.y + pacman.nextDy;
          
          if (nextX >= 0 && nextX < MAZE_WIDTH && nextY >= 0 && nextY < MAZE_HEIGHT && maze[nextY][nextX] !== 1) {
            newState.pacman = { ...pacman, x: nextX, y: nextY, dx: pacman.nextDx, dy: pacman.nextDy };
          }
        }
        
        // Check pellet collision
        newState.pellets = pellets.filter(p => p.x !== pacman.x || p.y !== pacman.y);
        if (pellets.length !== newState.pellets.length) {
          setScore(s => s + 10);
        }
        
        // Check power pellet collision
        const powerEaten = powerPellets.find(p => p.x === pacman.x && p.y === pacman.y);
        if (powerEaten) {
          newState.powerPellets = powerPellets.filter(p => p !== powerEaten);
          newState.powerMode = true;
          newState.powerTimer = 100;
          setScore(s => s + 50);
        }
        
        // Update power mode
        if (powerMode) {
          newState.powerTimer = powerTimer - 1;
          if (newState.powerTimer <= 0) {
            newState.powerMode = false;
          }
        }
        
        // Update ghosts
        newState.ghosts = ghosts.map(ghost => {
          let newGhost = { ...ghost };
          
          // Simple AI: move towards Pac-Man or random
          if (Math.random() < 0.7) {
            const dx = pacman.x - ghost.x;
            const dy = pacman.y - ghost.y;
            
            if (Math.abs(dx) > Math.abs(dy)) {
              newGhost.dx = dx > 0 ? 1 : -1;
              newGhost.dy = 0;
            } else {
              newGhost.dx = 0;
              newGhost.dy = dy > 0 ? 1 : -1;
            }
          } else {
            // Random movement
            const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
            const [dx, dy] = dirs[Math.floor(Math.random() * 4)];
            newGhost.dx = dx;
            newGhost.dy = dy;
          }
          
          const nextX = ghost.x + newGhost.dx;
          const nextY = ghost.y + newGhost.dy;
          
          if (nextX >= 0 && nextX < MAZE_WIDTH && nextY >= 0 && nextY < MAZE_HEIGHT && maze[nextY][nextX] !== 1) {
            newGhost.x = nextX;
            newGhost.y = nextY;
          }
          
          newGhost.scared = powerMode;
          
          return newGhost;
        });
        
        // Check ghost collision
        const collision = ghosts.find(g => g.x === pacman.x && g.y === pacman.y);
        if (collision) {
          if (powerMode) {
            // Eat ghost
            newState.ghosts = ghosts.filter(g => g !== collision);
            setScore(s => s + 200);
          } else {
            // Game over
            setGameOver(true);
            if (score > highScore) {
              setHighScore(score);
            }
          }
        }
        
        // Check win condition
        if (newState.pellets.length === 0 && newState.powerPellets.length === 0) {
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
          }
        }
        
        return newState;
      });
    }, 200);
    
    return () => clearInterval(gameInterval);
  }, [gameStarted, gameOver, highScore, score]);
  
  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#04091A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw maze
    for (let y = 0; y < MAZE_HEIGHT; y++) {
      for (let x = 0; x < MAZE_WIDTH; x++) {
        if (maze[y][x] === 1) {
          ctx.fillStyle = '#5A8BC8';
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }
    
    // Draw pellets
    ctx.fillStyle = '#CDD8F0';
    gameState.pellets.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x * CELL_SIZE + CELL_SIZE/2, p.y * CELL_SIZE + CELL_SIZE/2, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw power pellets
    ctx.fillStyle = '#FFD700';
    gameState.powerPellets.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x * CELL_SIZE + CELL_SIZE/2, p.y * CELL_SIZE + CELL_SIZE/2, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw Pac-Man
    const { pacman } = gameState;
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(pacman.x * CELL_SIZE + CELL_SIZE/2, pacman.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2 - 2, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacman.x * CELL_SIZE + CELL_SIZE/2, pacman.y * CELL_SIZE + CELL_SIZE/2);
    ctx.fill();
    
    // Draw ghosts
    gameState.ghosts.forEach(ghost => {
      ctx.fillStyle = ghost.scared ? '#0000FF' : ghost.color;
      ctx.beginPath();
      ctx.arc(ghost.x * CELL_SIZE + CELL_SIZE/2, ghost.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2 - 2, Math.PI, 0);
      ctx.lineTo(ghost.x * CELL_SIZE + CELL_SIZE, ghost.y * CELL_SIZE + CELL_SIZE);
      ctx.lineTo(ghost.x * CELL_SIZE + CELL_SIZE, ghost.y * CELL_SIZE + CELL_SIZE - 4);
      ctx.lineTo(ghost.x * CELL_SIZE + CELL_SIZE - 4, ghost.y * CELL_SIZE + CELL_SIZE);
      ctx.lineTo(ghost.x * CELL_SIZE + CELL_SIZE - 8, ghost.y * CELL_SIZE + CELL_SIZE - 4);
      ctx.lineTo(ghost.x * CELL_SIZE + CELL_SIZE - 12, ghost.y * CELL_SIZE + CELL_SIZE);
      ctx.lineTo(ghost.x * CELL_SIZE, ghost.y * CELL_SIZE + CELL_SIZE);
      ctx.fill();
      
      // Ghost eyes
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(ghost.x * CELL_SIZE + CELL_SIZE/2 - 3, ghost.y * CELL_SIZE + CELL_SIZE/2 - 2, 2, 0, Math.PI * 2);
      ctx.arc(ghost.x * CELL_SIZE + CELL_SIZE/2 + 3, ghost.y * CELL_SIZE + CELL_SIZE/2 - 2, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [gameState]);
  
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setGameState(prev => ({
      ...prev,
      pacman: { x: 9, y: 15, dx: 0, dy: 0, nextDx: 0, nextDy: 0 },
      ghosts: [
        { x: 9, y: 9, dx: 1, dy: 0, color: "#FF0000", scared: false },
        { x: 8, y: 9, dx: -1, dy: 0, color: "#00FFFF", scared: false },
        { x: 10, y: 9, dx: 0, dy: 1, color: "#FFB8FF", scared: false },
        { x: 9, y: 10, dx: 0, dy: -1, color: "#FFB852", scared: false }
      ],
      powerMode: false,
      powerTimer: 0
    }));
  };
  
  return (
    <div style={{
      background: theme.bg,
      border: `2px solid ${theme.border}`,
      borderRadius: '8px',
      padding: '20px',
      fontFamily: "'Space Mono', monospace",
      color: theme.text,
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '15px', fontSize: '14px', fontWeight: 'bold' }}>
        PAC-MAN GAME
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px' }}>
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={MAZE_WIDTH * CELL_SIZE}
        height={MAZE_HEIGHT * CELL_SIZE}
        style={{
          border: `1px solid ${theme.border}`,
          borderRadius: '4px',
          display: 'block',
          margin: '0 auto'
        }}
      />
      
      {!gameStarted && (
        <div style={{ marginTop: '15px' }}>
          <button
            onClick={startGame}
            style={{
              background: theme.accent,
              color: theme.bg,
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: "'Space Mono', monospace"
            }}
          >
            START GAME
          </button>
          <div style={{ marginTop: '10px', fontSize: '10px', opacity: 0.7 }}>
            Use arrow keys to move
          </div>
        </div>
      )}
      
      {gameOver && (
        <div style={{ marginTop: '15px' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
            {gameState.pellets.length === 0 && gameState.powerPellets.length === 0 ? 'YOU WIN!' : 'GAME OVER'}
          </div>
          <button
            onClick={startGame}
            style={{
              background: theme.accent,
              color: theme.bg,
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: "'Space Mono', monospace"
            }}
          >
            PLAY AGAIN
          </button>
        </div>
      )}
      
      {gameStarted && !gameOver && (
        <div style={{ marginTop: '10px', fontSize: '10px', opacity: 0.7 }}>
          {gameState.powerMode ? `POWER MODE: ${gameState.powerTimer}` : 'Arrow keys to move'}
        </div>
      )}
    </div>
  );
}
