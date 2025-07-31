import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, RotateCcw, Trophy, Heart } from 'lucide-react';

interface GameState {
  player: {
    x: number;
    y: number;
    width: number;
    height: number;
    lives: number;
  };
  bullets: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
  }>;
  enemies: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    direction: number;
    type: 'basic' | 'advanced';
    shootTimer: number;
  }>;
  enemyBullets: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
  }>;
  particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
  }>;
  score: number;
  gameStatus: 'menu' | 'playing' | 'gameOver' | 'victory';
  enemiesKilled: number;
  totalEnemies: number;
}

export const GalagaGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isShootingRef = useRef(false);
  const lastShotTimeRef = useRef(0);
  
  // Player hit blinking effect refs
  const playerBlinkingRef = useRef(false);
  const blinkTimerRef = useRef(0);
  const blinkCountRef = useRef(0);
  const blinkVisibleRef = useRef(true);
  
  const [gameStatus, setGameStatus] = useState<'menu' | 'playing' | 'gameOver' | 'victory'>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const BULLET_SPEED = 8;
  const ENEMY_BULLET_SPEED = 4;
  const SHOT_COOLDOWN = 150; // milliseconds
  const BLINK_DURATION = 150; // milliseconds per blink
  const TOTAL_BLINKS = 3;

  const initializeGame = useCallback(() => {
    const enemies: GameState['enemies'] = [];
    
    // Create enemy formation
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        enemies.push({
          x: 100 + col * 80,
          y: 80 + row * 60,
          width: 40,
          height: 30,
          speed: 1 + row * 0.5,
          direction: 1,
          type: row < 2 ? 'advanced' : 'basic',
          shootTimer: Math.random() * 3000 + 1000, // Random shooting interval
        });
      }
    }

    gameStateRef.current = {
      player: {
        x: CANVAS_WIDTH / 2 - 25,
        y: CANVAS_HEIGHT - 80,
        width: 50,
        height: 30,
        lives: 3,
      },
      bullets: [],
      enemies,
      enemyBullets: [],
      particles: [],
      score: 0,
      gameStatus: 'playing',
      enemiesKilled: 0,
      totalEnemies: enemies.length,
    };

    // Reset blink state
    playerBlinkingRef.current = false;
    blinkTimerRef.current = 0;
    blinkCountRef.current = 0;
    blinkVisibleRef.current = true;

    setGameStatus('playing');
    setScore(0);
    setLives(3);
  }, []);

  const createParticles = (x: number, y: number, color: string, count: number = 8) => {
    if (!gameStateRef.current) return;
    
    for (let i = 0; i < count; i++) {
      gameStateRef.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 30,
        maxLife: 30,
        color,
      });
    }
  };

  const startPlayerBlink = () => {
    playerBlinkingRef.current = true;
    blinkTimerRef.current = 0;
    blinkCountRef.current = 0;
    blinkVisibleRef.current = true;
  };

  const updatePlayerBlink = () => {
    if (!playerBlinkingRef.current) return;

    blinkTimerRef.current += 16; // Assuming 60fps (16ms per frame)

    if (blinkTimerRef.current >= BLINK_DURATION) {
      blinkVisibleRef.current = !blinkVisibleRef.current;
      blinkTimerRef.current = 0;
      
      if (!blinkVisibleRef.current) {
        blinkCountRef.current += 1;
      }

      if (blinkCountRef.current >= TOTAL_BLINKS) {
        playerBlinkingRef.current = false;
        blinkVisibleRef.current = true;
      }
    }
  };

  const checkCollisions = () => {
    if (!gameStateRef.current) return;
    const state = gameStateRef.current;

    // Player bullets vs enemies
    state.bullets.forEach((bullet, bulletIndex) => {
      state.enemies.forEach((enemy, enemyIndex) => {
        if (
          bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y
        ) {
          // Hit!
          createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, '#F59E0B', 12);
          state.bullets.splice(bulletIndex, 1);
          state.enemies.splice(enemyIndex, 1);
          state.score += enemy.type === 'advanced' ? 200 : 100;
          state.enemiesKilled += 1;
          setScore(state.score);
        }
      });
    });

    // Enemy bullets vs player
    state.enemyBullets.forEach((bullet, bulletIndex) => {
      if (
        bullet.x < state.player.x + state.player.width &&
        bullet.x + bullet.width > state.player.x &&
        bullet.y < state.player.y + state.player.height &&
        bullet.y + bullet.height > state.player.y
      ) {
        // Player hit!
        createParticles(state.player.x + state.player.width / 2, state.player.y + state.player.height / 2, '#EF4444', 15);
        state.enemyBullets.splice(bulletIndex, 1);
        state.player.lives -= 1;
        setLives(state.player.lives);
        
        // Start blinking effect
        startPlayerBlink();
        
        if (state.player.lives <= 0) {
          state.gameStatus = 'gameOver';
          setGameStatus('gameOver');
        }
      }
    });

    // Check victory condition
    if (state.enemies.length === 0) {
      state.gameStatus = 'victory';
      setGameStatus('victory');
    }
  };

  const updateGame = () => {
    if (!gameStateRef.current || gameStateRef.current.gameStatus !== 'playing') return;
    
    const state = gameStateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Update player position
    state.player.x = Math.max(0, Math.min(CANVAS_WIDTH - state.player.width, mousePositionRef.current.x - state.player.width / 2));

    // Update player blinking effect
    updatePlayerBlink();

    // Update bullets
    state.bullets.forEach((bullet, index) => {
      bullet.y -= bullet.speed;
      if (bullet.y < 0) {
        state.bullets.splice(index, 1);
      }
    });

    // Update enemy bullets
    state.enemyBullets.forEach((bullet, index) => {
      bullet.y += bullet.speed;
      if (bullet.y > CANVAS_HEIGHT) {
        state.enemyBullets.splice(index, 1);
      }
    });

    // Update enemies
    let shouldChangeDirection = false;
    state.enemies.forEach((enemy) => {
      enemy.x += enemy.speed * enemy.direction;
      
      if (enemy.x <= 0 || enemy.x >= CANVAS_WIDTH - enemy.width) {
        shouldChangeDirection = true;
      }

      // Enemy shooting
      enemy.shootTimer -= 16; // Assuming 60fps
      if (enemy.shootTimer <= 0 && Math.random() < 0.001) {
        state.enemyBullets.push({
          x: enemy.x + enemy.width / 2 - 2,
          y: enemy.y + enemy.height,
          width: 4,
          height: 8,
          speed: ENEMY_BULLET_SPEED,
        });
        enemy.shootTimer = Math.random() * 2000 + 1000;
      }
    });

    if (shouldChangeDirection) {
      state.enemies.forEach((enemy) => {
        enemy.direction *= -1;
        enemy.y += 20;
      });
    }

    // Update particles
    state.particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 1;
      particle.vy += 0.2; // Gravity
      
      if (particle.life <= 0) {
        state.particles.splice(index, 1);
      }
    });

    checkCollisions();
  };

  const renderGame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !gameStateRef.current) return;

    const state = gameStateRef.current;

    // Clear canvas with starfield background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw simple starfield
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 50; i++) {
      const x = (i * 123) % CANVAS_WIDTH;
      const y = (i * 456 + Date.now() * 0.1) % CANVAS_HEIGHT;
      ctx.fillRect(x, y, 1, 1);
    }

    // Draw player with blinking effect
    if (!playerBlinkingRef.current || blinkVisibleRef.current) {
      // Determine player color based on blinking state
      const isBlinkingRed = playerBlinkingRef.current && blinkVisibleRef.current;
      const playerMainColor = isBlinkingRed ? '#EF4444' : '#60A5FA';
      const playerAccentColor = isBlinkingRed ? '#F87171' : '#93C5FD';
      const playerDetailColor = isBlinkingRed ? '#FBBF24' : '#EF4444';

      // Main ship body
      ctx.fillStyle = playerMainColor;
      ctx.fillRect(state.player.x, state.player.y, state.player.width, state.player.height);
      
      // Player ship details
      ctx.fillStyle = playerAccentColor;
      ctx.fillRect(state.player.x + 10, state.player.y - 5, 30, 10);
      ctx.fillStyle = playerDetailColor;
      ctx.fillRect(state.player.x + 20, state.player.y + 5, 10, 20);

      // Add glow effect when blinking red
      if (isBlinkingRed) {
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 15;
        ctx.fillStyle = playerMainColor;
        ctx.fillRect(state.player.x, state.player.y, state.player.width, state.player.height);
        ctx.shadowBlur = 0;
      }
    }

    // Draw player bullets
    ctx.fillStyle = '#F59E0B';
    state.bullets.forEach((bullet) => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      // Add glow effect
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 5;
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      ctx.shadowBlur = 0;
    });

    // Draw enemies
    state.enemies.forEach((enemy) => {
      ctx.fillStyle = enemy.type === 'advanced' ? '#7C3AED' : '#EF4444';
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      
      // Enemy details
      ctx.fillStyle = enemy.type === 'advanced' ? '#A855F7' : '#F87171';
      ctx.fillRect(enemy.x + 5, enemy.y + 5, enemy.width - 10, enemy.height - 10);
      
      // Enemy "eyes"
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(enemy.x + 8, enemy.y + 8, 6, 6);
      ctx.fillRect(enemy.x + enemy.width - 14, enemy.y + 8, 6, 6);
    });

    // Draw enemy bullets
    ctx.fillStyle = '#EF4444';
    state.enemyBullets.forEach((bullet) => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      ctx.shadowColor = '#EF4444';
      ctx.shadowBlur = 3;
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      ctx.shadowBlur = 0;
    });

    // Draw particles
    state.particles.forEach((particle) => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.fillRect(particle.x, particle.y, 3, 3);
    });
  };

  const gameLoop = () => {
    updateGame();
    renderGame();
    animationIdRef.current = requestAnimationFrame(gameLoop);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    
    mousePositionRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = () => {
    isShootingRef.current = true;
    shoot();
  };

  const handleMouseUp = () => {
    isShootingRef.current = false;
  };

  const shoot = () => {
    if (!gameStateRef.current || gameStateRef.current.gameStatus !== 'playing') return;
    
    const now = Date.now();
    if (now - lastShotTimeRef.current < SHOT_COOLDOWN) return;
    
    lastShotTimeRef.current = now;
    
    const state = gameStateRef.current;
    state.bullets.push({
      x: state.player.x + state.player.width / 2 - 2,
      y: state.player.y,
      width: 4,
      height: 12,
      speed: BULLET_SPEED,
    });
  };

  const startGame = () => {
    initializeGame();
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    gameLoop();
  };

  const resetGame = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    setGameStatus('menu');
    setScore(0);
    setLives(3);
    gameStateRef.current = null;
    
    // Reset blink state
    playerBlinkingRef.current = false;
    blinkTimerRef.current = 0;
    blinkCountRef.current = 0;
    blinkVisibleRef.current = true;
  };

  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-400 border-b border-red-500/30 pb-2 inline-block">
          🎮 Galaga Mini-Game
        </h2>
        <p className="text-gray-400">
          A classic space shooter as a fun bonus! Use your mouse to move and click to shoot.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6 inline-block">
          {/* Game Stats */}
          <div className="flex justify-between items-center mb-4 px-4">
            <div className="flex items-center space-x-4">
              <span className="text-yellow-400 font-mono">Score: {score}</span>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-white">{lives}</span>
              </div>
            </div>
            
            {gameStatus === 'playing' && (
              <button
                onClick={resetGame}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-sm transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {/* Game Canvas */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="border border-gray-700 rounded bg-black cursor-crosshair"
              style={{ maxWidth: '100%', height: 'auto' }}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />

            {/* Game State Overlays */}
            {gameStatus === 'menu' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-white">Galaga Clone</h3>
                  <p className="text-gray-300">Defeat all enemies to win!</p>
                  <p className="text-gray-400 text-sm">Move: Mouse | Shoot: Left Click</p>
                  <button
                    onClick={startGame}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors mx-auto"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Game</span>
                  </button>
                </div>
              </div>
            )}

            {gameStatus === 'gameOver' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-red-400">Game Over</h3>
                  <p className="text-white">Final Score: {score}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={startGame}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Try Again</span>
                    </button>
                    <button
                      onClick={resetGame}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
                    >
                      Main Menu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {gameStatus === 'victory' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded">
                <div className="text-center space-y-4">
                  <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
                  <h3 className="text-2xl font-bold text-yellow-400">Victory!</h3>
                  <p className="text-white">You defeated all enemies!</p>
                  <p className="text-green-400">Final Score: {score}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={startGame}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      <span>Play Again</span>
                    </button>
                    <button
                      onClick={resetGame}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
                    >
                      Main Menu
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-purple-400 font-medium">Controls:</p>
                <p className="text-gray-400">Mouse: Move ship</p>
                <p className="text-gray-400">Left Click: Shoot</p>
              </div>
              <div className="space-y-1">
                <p className="text-purple-400 font-medium">Scoring:</p>
                <p className="text-gray-400">Red Enemy: 100pts</p>
                <p className="text-gray-400">Purple Enemy: 200pts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};