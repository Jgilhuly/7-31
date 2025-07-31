class Pipe {
    constructor(canvas, x) {
        this.canvas = canvas;
        this.x = x;
        this.width = 50;
        this.gap = 150;
        this.speed = 2;
        this.passed = false;
        
        // Colors from CSS variables
        this.color = '#228B22';
        this.capColor = '#32CD32';
        
        // Generate random pipe height
        this.topHeight = Math.random() * (canvas.height - this.gap - 100) + 50;
        this.bottomY = this.topHeight + this.gap;
        this.bottomHeight = canvas.height - this.bottomY;
        
        // Cap dimensions
        this.capHeight = 20;
        this.capOverhang = 5;
    }
    
    update() {
        this.x -= this.speed;
    }
    
    isOffScreen() {
        return this.x + this.width < 0;
    }
    
    hasPassedBird(birdX) {
        if (!this.passed && this.x + this.width < birdX) {
            this.passed = true;
            return true;
        }
        return false;
    }
    
    getBounds() {
        return {
            x: this.x,
            width: this.width,
            topHeight: this.topHeight,
            bottomY: this.bottomY,
            bottomHeight: this.bottomHeight
        };
    }
    
    render(ctx) {
        // Draw pipe bodies
        ctx.fillStyle = this.color;
        
        // Top pipe body
        ctx.fillRect(this.x, 0, this.width, this.topHeight);
        
        // Bottom pipe body  
        ctx.fillRect(this.x, this.bottomY, this.width, this.bottomHeight);
        
        // Draw pipe caps with 3D effect
        this.renderPipeCap(ctx, this.x, this.topHeight - this.capHeight, true);
        this.renderPipeCap(ctx, this.x, this.bottomY, false);
        
        // Add some shading for 3D effect
        this.addShading(ctx);
    }
    
    renderPipeCap(ctx, x, y, isTopCap) {
        // Cap background
        ctx.fillStyle = this.capColor;
        ctx.fillRect(
            x - this.capOverhang, 
            y, 
            this.width + (this.capOverhang * 2), 
            this.capHeight
        );
        
        // Cap highlight (top edge)
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(
            x - this.capOverhang, 
            y, 
            this.width + (this.capOverhang * 2), 
            3
        );
        
        // Cap shadow (bottom edge)
        ctx.fillStyle = '#006400';
        ctx.fillRect(
            x - this.capOverhang, 
            y + this.capHeight - 3, 
            this.width + (this.capOverhang * 2), 
            3
        );
    }
    
    addShading(ctx) {
        // Add left side highlight
        ctx.fillStyle = 'rgba(144, 238, 144, 0.3)';
        ctx.fillRect(this.x, 0, 3, this.topHeight);
        ctx.fillRect(this.x, this.bottomY, 3, this.bottomHeight);
        
        // Add right side shadow
        ctx.fillStyle = 'rgba(0, 100, 0, 0.4)';
        ctx.fillRect(this.x + this.width - 3, 0, 3, this.topHeight);
        ctx.fillRect(this.x + this.width - 3, this.bottomY, 3, this.bottomHeight);
    }
}

class PipeManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.pipes = [];
        this.pipeSpacing = 90; // frames between pipes
        this.frameCount = 0;
    }
    
    reset() {
        this.pipes = [];
        this.frameCount = 0;
    }
    
    update(gameState) {
        if (gameState !== 'playing') return;
        
        this.frameCount++;
        
        // Generate new pipes
        if (this.frameCount % this.pipeSpacing === 0) {
            this.pipes.push(new Pipe(this.canvas, this.canvas.width));
        }
        
        // Update existing pipes
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i];
            pipe.update();
            
            // Remove off-screen pipes
            if (pipe.isOffScreen()) {
                this.pipes.splice(i, 1);
            }
        }
    }
    
    checkCollisions(bird) {
        for (const pipe of this.pipes) {
            if (bird.collidesWith(pipe)) {
                return true;
            }
        }
        return false;
    }
    
    checkScoring(bird) {
        let scoreIncrease = 0;
        for (const pipe of this.pipes) {
            if (pipe.hasPassedBird(bird.x)) {
                scoreIncrease++;
            }
        }
        return scoreIncrease;
    }
    
    render(ctx) {
        this.pipes.forEach(pipe => pipe.render(ctx));
    }
    
    getPipes() {
        return this.pipes;
    }
}