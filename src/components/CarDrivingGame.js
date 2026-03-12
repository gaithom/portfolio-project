import { useState, useEffect, useRef, useCallback } from "react";

// ── Car Driving Game Component ───────────────────────────────────────────────────
export function CarDrivingGame({ theme, scrollTo }) {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  
  // Game constants
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 300;
  const CAR_WIDTH = 30;
  const CAR_HEIGHT = 50;
  const GRAVITY = 0.5;
  const JUMP_FORCE = -12;
  const MAX_SPEED = 8;
  const ACCELERATION = 0.3;
  const FRICTION = 0.1;
  
  // Game state
  const [gameState, setGameState] = useState({
    car: {
      x: CANVAS_WIDTH / 2 - CAR_WIDTH / 2,
      y: CANVAS_HEIGHT - 100,
      vx: 0,
      vy: 0,
      angle: 0,
      onGround: true,
      jumping: false
    },
    obstacles: [],
    ramps: [],
    coins: [],
    particles: [],
    camera: { y: 0 }
  });
  
  // Initialize game objects
  useEffect(() => {
    const newObstacles = [];
    const newRamps = [];
    const newCoins = [];
    
    // Generate obstacles, ramps, and coins
    for (let i = 0; i < 20; i++) {
      // Obstacles
      if (Math.random() < 0.6) {
        newObstacles.push({
          x: Math.random() * (CANVAS_WIDTH - 40),
          y: -i * 200 - 100,
          width: 30 + Math.random() * 20,
          height: 20 + Math.random() * 30,
          type: Math.random() < 0.5 ? 'rock' : 'tree'
        });
      }
      
      // Ramps
      if (Math.random() < 0.3) {
        newRamps.push({
          x: Math.random() * (CANVAS_WIDTH - 60),
          y: -i * 200 - 150,
          width: 60,
          height: 15,
          angle: -15 - Math.random() * 10
        });
      }
      
      // Coins
      for (let j = 0; j < 3; j++) {
        if (Math.random() < 0.7) {
          newCoins.push({
            x: Math.random() * (CANVAS_WIDTH - 20) + 10,
            y: -i * 200 - 50 - j * 30,
            collected: false
          });
        }
      }
    }
    
    setGameState(prev => ({
      ...prev,
      obstacles: newObstacles,
      ramps: newRamps,
      coins: newCoins
    }));
  }, []);
  
  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted) return;
    
    const keys = {};
    
    const handleKeyDown = (e) => {
      keys[e.key] = true;
      
      // Jump
      if (e.key === ' ' || e.key === 'ArrowUp') {
        setGameState(prev => {
          if (prev.car.onGround && !prev.car.jumping) {
            return {
              ...prev,
              car: { ...prev.car, vy: JUMP_FORCE, jumping: true, onGround: false }
            };
          }
          return prev;
        });
      }
    };
    
    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Game loop
    const gameInterval = setInterval(() => {
      setGameState(prev => {
        let newState = { ...prev };
        const { car, obstacles, ramps, coins, particles, camera } = prev;
        
        // Handle input
        if (keys['ArrowLeft']) {
          car.vx = Math.max(car.vx - ACCELERATION, -MAX_SPEED);
        }
        if (keys['ArrowRight']) {
          car.vx = Math.min(car.vx + ACCELERATION, MAX_SPEED);
        }
        
        // Apply physics
        car.vx *= (1 - FRICTION);
        car.x += car.vx;
        car.vy += GRAVITY;
        car.y += car.vy;
        
        // Keep car on screen
        car.x = Math.max(0, Math.min(CANVAS_WIDTH - CAR_WIDTH, car.x));
        
        // Check ground collision
        const groundY = CANVAS_HEIGHT - 50;
        if (car.y + CAR_HEIGHT >= groundY) {
          car.y = groundY - CAR_HEIGHT;
          car.vy = 0;
          car.onGround = true;
          car.jumping = false;
        }
        
        // Check ramp collisions
        ramps.forEach(ramp => {
          const rampScreenY = ramp.y + camera.y;
          if (car.x < ramp.x + ramp.width &&
              car.x + CAR_WIDTH > ramp.x &&
              car.y < rampScreenY + ramp.height &&
              car.y + CAR_HEIGHT > rampScreenY) {
            
            // Apply ramp force
            if (car.vy > 0) { // Only when falling
              car.vy = JUMP_FORCE * 1.5;
              car.onGround = false;
              car.jumping = true;
              
              // Add particles
              for (let i = 0; i < 5; i++) {
                particles.push({
                  x: car.x + CAR_WIDTH / 2,
                  y: car.y + CAR_HEIGHT,
                  vx: (Math.random() - 0.5) * 4,
                  vy: -Math.random() * 4,
                  life: 20,
                  color: theme.accent
                });
              }
            }
          }
        });
        
        // Check obstacle collisions
        obstacles.forEach(obstacle => {
          const obstacleScreenY = obstacle.y + camera.y;
          if (car.x < obstacle.x + obstacle.width &&
              car.x + CAR_WIDTH > obstacle.x &&
              car.y < obstacleScreenY + obstacle.height &&
              car.y + CAR_HEIGHT > obstacleScreenY) {
            
            // Bounce back
            car.vx *= -0.5;
            car.x += car.vx * 2;
            setSpeed(prev => Math.max(0, prev - 2));
          }
        });
        
        // Check coin collection
        coins.forEach((coin, index) => {
          if (!coin.collected) {
            const coinScreenY = coin.y + camera.y;
            if (Math.abs(car.x + CAR_WIDTH/2 - coin.x) < 20 &&
                Math.abs(car.y + CAR_HEIGHT/2 - coinScreenY) < 20) {
              coin.collected = true;
              setScore(prev => prev + 10);
              
              // Add particles
              for (let i = 0; i < 8; i++) {
                particles.push({
                  x: coin.x,
                  y: coinScreenY,
                  vx: (Math.random() - 0.5) * 6,
                  vy: -Math.random() * 6,
                  life: 25,
                  color: '#FFD700'
                });
              }
            }
          }
        });
        
        // Update particles
        newState.particles = particles
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.3,
            life: p.life - 1
          }))
          .filter(p => p.life > 0);
        
        // Update camera (follow car)
        const targetCameraY = Math.min(0, -(car.y - CANVAS_HEIGHT + 150));
        camera.y += (targetCameraY - camera.y) * 0.1;
        
        // Update speed and distance
        setSpeed(Math.abs(car.vx));
        setDistance(prev => prev + Math.abs(car.vx) * 0.1);
        
        // Auto-scroll when moving forward
        if (car.vx > 0) {
          obstacles.forEach(o => o.y += car.vx * 0.3);
          ramps.forEach(r => r.y += car.vx * 0.3);
          coins.forEach(c => c.y += car.vx * 0.3);
        }
        
        return newState;
      });
    }, 1000 / 60); // 60 FPS
      
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(gameInterval);
    };
  }, [gameStarted, theme.accent]);
  
  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw background pattern
    ctx.strokeStyle = theme.animFg;
    ctx.lineWidth = 1;
    for (let i = 0; i < CANVAS_HEIGHT; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i + gameState.camera.y % 30);
      ctx.lineTo(CANVAS_WIDTH, i + gameState.camera.y % 30);
      ctx.stroke();
    }
    
    // Draw ground
    ctx.fillStyle = theme.accent;
    ctx.fillRect(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH, 50);
    
    // Draw road details
    ctx.fillStyle = theme.textMuted;
    for (let i = 0; i < CANVAS_WIDTH; i += 40) {
      ctx.fillRect(i + (gameState.camera.y * 0.5) % 80, CANVAS_HEIGHT - 30, 20, 5);
    }
    
    // Draw ramps
    gameState.ramps.forEach(ramp => {
      const rampY = ramp.y + gameState.camera.y;
      if (rampY > -50 && rampY < CANVAS_HEIGHT + 50) {
        ctx.save();
        ctx.translate(ramp.x + ramp.width/2, rampY + ramp.height/2);
        ctx.rotate(ramp.angle * Math.PI / 180);
        ctx.fillStyle = theme.borderMid;
        ctx.fillRect(-ramp.width/2, -ramp.height/2, ramp.width, ramp.height);
        ctx.restore();
      }
    });
    
    // Draw obstacles
    gameState.obstacles.forEach(obstacle => {
      const obstacleY = obstacle.y + gameState.camera.y;
      if (obstacleY > -50 && obstacleY < CANVAS_HEIGHT + 50) {
        ctx.fillStyle = obstacle.type === 'rock' ? '#8B7355' : '#228B22';
        ctx.fillRect(obstacle.x, obstacleY, obstacle.width, obstacle.height);
        
        // Add details
        if (obstacle.type === 'tree') {
          ctx.fillStyle = '#654321';
          ctx.fillRect(obstacle.x + obstacle.width/3, obstacleY + obstacle.height, obstacle.width/3, 10);
        }
      }
    });
    
    // Draw coins
    gameState.coins.forEach(coin => {
      if (!coin.collected) {
        const coinY = coin.y + gameState.camera.y;
        if (coinY > -30 && coinY < CANVAS_HEIGHT + 30) {
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(coin.x, coinY, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FFA500';
          ctx.beginPath();
          ctx.arc(coin.x, coinY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
    
    // Draw particles
    gameState.particles.forEach(particle => {
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.life / 25;
      ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
    });
    ctx.globalAlpha = 1;
    
    // Draw car
    const { car } = gameState;
    ctx.save();
    ctx.translate(car.x + CAR_WIDTH/2, car.y + CAR_HEIGHT/2);
    ctx.rotate(car.angle * Math.PI / 180);
    
    // Car body
    ctx.fillStyle = '#FF4444';
    ctx.fillRect(-CAR_WIDTH/2, -CAR_HEIGHT/2, CAR_WIDTH, CAR_HEIGHT);
    
    // Car windows
    ctx.fillStyle = '#4444FF';
    ctx.fillRect(-CAR_WIDTH/2 + 5, -CAR_HEIGHT/2 + 5, CAR_WIDTH - 10, 15);
    
    // Car wheels
    ctx.fillStyle = '#000000';
    ctx.fillRect(-CAR_WIDTH/2 - 3, -CAR_HEIGHT/2 + 5, 6, 10);
    ctx.fillRect(CAR_WIDTH/2 - 3, -CAR_HEIGHT/2 + 5, 6, 10);
    ctx.fillRect(-CAR_WIDTH/2 - 3, CAR_HEIGHT/2 - 15, 6, 10);
    ctx.fillRect(CAR_WIDTH/2 - 3, CAR_HEIGHT/2 - 15, 6, 10);
    
    ctx.restore();
    
  }, [gameState, theme]);
  
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setDistance(0);
    setSpeed(0);
  };
  
  return (
    <div style={{
      background: theme.bg,
      border: `2px solid ${theme.border}`,
      borderRadius: '12px',
      padding: '20px',
      fontFamily: "'Space Mono', monospace",
      color: theme.text,
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '15px', fontSize: '14px', fontWeight: 'bold' }}>
        🚗 FOREST DRIVER
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px' }}>
        <div>Score: {score}</div>
        <div>Speed: {speed.toFixed(1)}</div>
        <div>Distance: {distance.toFixed(0)}m</div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          border: `2px solid ${theme.border}`,
          borderRadius: '8px',
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
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: "'Space Mono', monospace"
            }}
          >
            START DRIVING
          </button>
          <div style={{ marginTop: '10px', fontSize: '10px', opacity: 0.7, lineHeight: 1.4 }}>
            Use Arrow Keys to drive<br/>
            Space/Up to jump<br/>
            Collect coins & hit ramps!
          </div>
        </div>
      )}
      
      {gameStarted && (
        <div style={{ marginTop: '10px', fontSize: '10px', opacity: 0.7 }}>
          Arrow Keys: Drive | Space/Up: Jump
        </div>
      )}
      
      <div style={{ marginTop: '15px', fontSize: '10px', opacity: 0.6 }}>
        Drive to explore the portfolio! 🌲
      </div>
    </div>
  );
}
