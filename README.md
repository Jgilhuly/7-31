# Flappy Bird - Modern Multi-File Implementation

A modernized version of the classic Flappy Bird game, rebuilt with a clean multi-file architecture and contemporary web technologies.

## 🎮 Features

- **Modern Architecture**: Clean separation of concerns with dedicated files for each component
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern Styling**: CSS custom properties, gradients, animations, and glassmorphism effects
- **High Score Persistence**: Automatically saves your best score using localStorage
- **Enhanced Visuals**: 
  - Smooth bird animations with rotation and wing flapping
  - 3D-styled pipes with shadows and highlights
  - Moving cloud background
  - Visual state transitions and overlays
- **Accessibility**: Reduced motion support and high contrast mode compatibility
- **Touch Support**: Full mobile/touch device compatibility

## 📁 File Structure

```
├── index.html          # Main HTML structure with semantic markup
├── styles.css          # Modern CSS with custom properties and responsive design
├── bird.js             # Bird class with physics and rendering
├── pipe.js             # Pipe and PipeManager classes
├── game.js             # Main game engine and coordination
├── flappy-bird.html    # Original single-file implementation (legacy)
└── README.md           # This documentation
```

## 🚀 Getting Started

1. **Open the game**: Simply open `index.html` in any modern web browser
2. **Controls**: 
   - Press `SPACEBAR` or `CLICK/TAP` to make the bird flap
   - Same controls work to start the game and restart after game over

## 🛠 Technical Details

### Architecture Overview

- **Bird Class** (`bird.js`): Handles bird physics, animation, and collision detection
- **Pipe Classes** (`pipe.js`): Individual pipe objects and pipe management system
- **Game Engine** (`game.js`): Coordinates all systems, handles game states, and manages the game loop
- **Modern CSS** (`styles.css`): Uses custom properties, modern layout techniques, and accessibility features

### Key Improvements Over Original

1. **Modular Code**: Each component is self-contained and reusable
2. **Enhanced Graphics**: Better visual effects and smoother animations
3. **Modern Web Standards**: Uses latest CSS and JavaScript features
4. **Mobile Optimized**: Responsive design that works on all screen sizes
5. **Performance**: Optimized rendering and efficient collision detection
6. **Developer Experience**: Clear code structure with debugging utilities

### CSS Features

- CSS Custom Properties (variables) for consistent theming
- Modern gradients and backdrop filters
- Smooth animations with `cubic-bezier` easing
- Responsive design with `clamp()` and media queries
- Accessibility support (reduced motion, high contrast)
- Glassmorphism UI effects

### JavaScript Features

- ES6+ Classes and modern syntax
- Clean separation of concerns
- Efficient game loop with `requestAnimationFrame`
- Local storage for high score persistence
- Touch and keyboard input handling
- Debug utilities for development

## 🎯 Game Mechanics

- **Physics**: Realistic gravity and jump mechanics
- **Collision Detection**: Precise collision between bird and pipes
- **Scoring**: Points awarded for passing through pipes
- **Difficulty**: Consistent challenge with randomly positioned pipes
- **Visual Feedback**: Rotation, wing flapping, and state-based overlays

## 🔧 Development

### Debug Tools

Open the browser console and use these debug commands:

```javascript
// Access the game instance
debugGame.getGame()

// Change game state
debugGame.setState('playing')  // or 'start', 'gameOver'

// Add points to score
debugGame.addScore(5)
```

### Customization

The game is designed to be easily customizable:

- **Colors**: Modify CSS custom properties in `:root`
- **Physics**: Adjust values in the `Bird` class constructor
- **Difficulty**: Change pipe spacing and speed in `PipeManager`
- **Visual Effects**: Modify render methods in respective classes

## 🌐 Browser Compatibility

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile**: iOS Safari 12+, Android Chrome 60+
- **Features Used**: Canvas 2D, CSS Custom Properties, ES6 Classes, LocalStorage

## 📱 Mobile Support

- Touch-friendly controls
- Responsive canvas sizing
- Optimized for portrait orientation
- Prevents unwanted scrolling during gameplay

## 🎨 Design Philosophy

This modernized version maintains the simplicity and addictive gameplay of the original while incorporating:

- Clean, maintainable code architecture
- Modern web development best practices  
- Enhanced user experience with smooth animations
- Accessibility considerations
- Mobile-first responsive design

---

**Note**: The original single-file implementation is preserved as `flappy-bird.html` for reference.