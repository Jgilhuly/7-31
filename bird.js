class Bird {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        
        // Bird properties
        this.width = 20;
        this.height = 20;
        this.gravity = 0.5;
        this.jumpPower = -8;
        this.maxVelocity = 10;
        
        // Colors from CSS variables
        this.color = '#FF4444';
        this.wingColor = '#CC2222';
        
        // Animation properties
        this.rotation = 0;
        this.wingFlap = 0;
    }
    
    reset() {
        this.x = 50;
        this.y = this.canvas.height / 2;
        this.velocity = 0;
        this.rotation = 0;
        this.wingFlap = 0;
    }
    
    jump() {
        this.velocity = this.jumpPower;
        this.wingFlap = 1; // Trigger wing animation
    }
    
    update() {
        // Apply gravity
        this.velocity += this.gravity;
        
        // Limit velocity
        if (this.velocity > this.maxVelocity) {
            this.velocity = this.maxVelocity;
        }
        
        // Update position
        this.y += this.velocity;
        
        // Calculate rotation based on velocity (for visual effect)
        this.rotation = Math.min(Math.max(this.velocity * 3, -30), 90);
        
        // Update wing flap animation
        if (this.wingFlap > 0) {
            this.wingFlap -= 0.1;
            if (this.wingFlap < 0) this.wingFlap = 0;
        }
    }
    
    checkBounds() {
        return this.y <= 0 || this.y + this.height >= this.canvas.height;
    }
    
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    render(ctx) {
        ctx.save();
        
        // Move to bird center for rotation
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        
        // Draw bird body
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // Draw wing with flap animation
        const wingOffset = this.wingFlap * 3;
        ctx.fillStyle = this.wingColor;
        ctx.fillRect(-this.width / 2 + 5, -this.height / 2 + 5 - wingOffset, 10, 8);
        
        // Draw eye
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-this.width / 2 + 12, -this.height / 2 + 6, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw pupil
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(-this.width / 2 + 13, -this.height / 2 + 6, 1.5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw beak
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.moveTo(this.width / 2, -2);
        ctx.lineTo(this.width / 2 + 8, 0);
        ctx.lineTo(this.width / 2, 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    // Helper method for collision detection
    collidesWith(pipe) {
        const birdBounds = this.getBounds();
        
        // Check collision with top pipe
        if (birdBounds.x < pipe.x + pipe.width && 
            birdBounds.x + birdBounds.width > pipe.x) {
            
            if (birdBounds.y < pipe.topHeight || 
                birdBounds.y + birdBounds.height > pipe.bottomY) {
                return true;
            }
        }
        
        return false;
    }
}