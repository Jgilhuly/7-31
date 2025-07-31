class FlappyBirdGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game state
        this.gameState = 'start'; // 'start', 'playing', 'gameOver'
        this.score = 0;
        this.highScore = this.loadHighScore();
        
        // Game objects
        this.bird = new Bird(this.canvas);
        this.pipeManager = new PipeManager(this.canvas);
        
        // UI elements
        this.scoreElement = document.getElementById('score');
        this.instructionsElement = document.getElementById('instructions');
        this.gameOverElement = document.getElementById('gameOver');
        this.finalScoreElement = document.getElementById('finalScore');
        
        // Input handling
        this.setupInputHandlers();
        
        // Background elements
        this.backgroundOffset = 0;
        
        // Initialize game
        this.init();
        this.startGameLoop();
    }
    
    init() {
        this.gameState = 'start';
        this.score = 0;
        this.bird.reset();
        this.pipeManager.reset();
        this.backgroundOffset = 0;
        this.updateUI();
    }
    
    setupInputHandlers() {
        // Keyboard input
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleInput();
            }
        });
        
        // Mouse/touch input
        this.canvas.addEventListener('click', () => {
            this.handleInput();
        });
        
        // Touch input for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleInput();
        });
    }
    
    handleInput() {
        switch (this.gameState) {
            case 'start':
                this.startGame();
                break;
            case 'playing':
                this.bird.jump();
                break;
            case 'gameOver':
                this.init();
                break;
        }
    }
    
    startGame() {
        this.gameState = 'playing';
        this.bird.jump(); // Give initial jump
        this.updateUI();
    }
    
    updateUI() {
        // Update score display
        this.scoreElement.textContent = `Score: ${this.score}`;
        
        // Show/hide UI elements based on game state
        this.instructionsElement.classList.toggle('hidden', this.gameState !== 'start');
        this.gameOverElement.classList.toggle('hidden', this.gameState !== 'gameOver');
        
        // Update final score display
        if (this.gameState === 'gameOver') {
            const isNewHighScore = this.score > this.highScore;
            if (isNewHighScore) {
                this.highScore = this.score;
                this.saveHighScore();
            }
            
            this.finalScoreElement.innerHTML = `
                Final Score: ${this.score}<br>
                ${isNewHighScore ? '<strong>NEW HIGH SCORE!</strong><br>' : ''}
                High Score: ${this.highScore}
            `;
        }
    }
    
    update() {
        if (this.gameState !== 'playing') return;
        
        // Update bird
        this.bird.update();
        
        // Check if bird hit boundaries
        if (this.bird.checkBounds()) {
            this.gameOver();
            return;
        }
        
        // Update pipes
        this.pipeManager.update(this.gameState);
        
        // Check collisions
        if (this.pipeManager.checkCollisions(this.bird)) {
            this.gameOver();
            return;
        }
        
        // Check scoring
        const scoreIncrease = this.pipeManager.checkScoring(this.bird);
        if (scoreIncrease > 0) {
            this.score += scoreIncrease;
            this.updateUI();
            this.playScoreSound();
        }
        
        // Update background
        this.backgroundOffset = (this.backgroundOffset + 0.5) % this.canvas.width;
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        this.updateUI();
        this.playGameOverSound();
    }
    
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        this.drawBackground();
        
        // Draw game objects
        this.pipeManager.render(this.ctx);
        this.bird.render(this.ctx);
        
        // Draw overlay effects based on game state
        if (this.gameState === 'start') {
            this.drawStartOverlay();
        } else if (this.gameState === 'gameOver') {
            this.drawGameOverOverlay();
        }
    }
    
    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw moving clouds for effect
        this.drawClouds();
    }
    
    drawClouds() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        
        // Draw several clouds that move with the background
        const cloudPositions = [
            { x: 100, y: 50, size: 30 },
            { x: 250, y: 80, size: 25 },
            { x: 350, y: 40, size: 35 },
            { x: 50, y: 120, size: 20 }
        ];
        
        cloudPositions.forEach(cloud => {
            const x = (cloud.x - this.backgroundOffset) % (this.canvas.width + 100);
            this.drawCloud(x, cloud.y, cloud.size);
        });
    }
    
    drawCloud(x, y, size) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 0.5, 0, 2 * Math.PI);
        this.ctx.arc(x + size * 0.3, y, size * 0.7, 0, 2 * Math.PI);
        this.ctx.arc(x + size * 0.6, y, size * 0.5, 0, 2 * Math.PI);
        this.ctx.arc(x + size * 0.3, y - size * 0.3, size * 0.6, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    drawStartOverlay() {
        // Subtle overlay to indicate start state
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawGameOverOverlay() {
        // Red tinted overlay for game over
        this.ctx.fillStyle = 'rgba(220, 20, 60, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // High score persistence
    loadHighScore() {
        const saved = localStorage.getItem('flappybird-highscore');
        return saved ? parseInt(saved, 10) : 0;
    }
    
    saveHighScore() {
        localStorage.setItem('flappybird-highscore', this.highScore.toString());
    }
    
    // Sound effects (placeholder - you could add Web Audio API here)
    playScoreSound() {
        // Placeholder for score sound effect
        // You could implement Web Audio API sounds here
    }
    
    playGameOverSound() {
        // Placeholder for game over sound effect
        // You could implement Web Audio API sounds here
    }
    
    // Main game loop
    startGameLoop() {
        const gameLoop = () => {
            this.update();
            this.render();
            requestAnimationFrame(gameLoop);
        };
        
        requestAnimationFrame(gameLoop);
    }
    
    // Utility methods
    getGameState() {
        return this.gameState;
    }
    
    getScore() {
        return this.score;
    }
    
    getHighScore() {
        return this.highScore;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new FlappyBirdGame();
});

// Add some utility functions for debugging
window.debugGame = {
    getGame: () => window.game,
    setState: (state) => {
        if (window.game) {
            window.game.gameState = state;
            window.game.updateUI();
        }
    },
    addScore: (points) => {
        if (window.game) {
            window.game.score += points;
            window.game.updateUI();
        }
    }
};