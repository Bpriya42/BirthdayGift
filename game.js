// Love Quest Game - Phaser 3 Implementation
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.currentLevel = 1;
        this.gameStarted = false;
    }

    preload() {
        // Create graphics using Phaser's built-in methods instead of canvas
        // We'll create these in the create() method instead
    }

    create() {
        // Create graphics for sprites using Phaser's graphics API
        this.createSprites();
        
        // Create the level
        this.createLevel();
        
        // Create player
        this.player = this.add.rectangle(100, 500, 32, 32, 0xFF69B4);
        this.player.setStrokeStyle(2, 0x000000);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(28, 28);

        // Create love token
        this.createLoveToken();

        // Create platforms group
        this.platforms = this.physics.add.staticGroup();
        this.createPlatforms();

        // Player physics
        this.physics.add.collider(this.player, this.platforms);

        // Token collection
        this.physics.add.overlap(this.player, this.token, this.collectToken, null, this);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,S,A,D');

        // Add level decorations
        this.addDecorations();

        // Display start message
        if (!this.gameStarted) {
            this.showStartMessage();
        }
    }

    createSprites() {
        // Create player sprite texture
        this.add.graphics()
            .fillStyle(0xFF69B4)
            .fillRect(0, 0, 32, 32)
            .lineStyle(2, 0x000000)
            .strokeRect(0, 0, 32, 32)
            .generateTexture('player', 32, 32)
            .destroy();

        // Create token sprite texture (heart-like circle)
        this.add.graphics()
            .fillStyle(0xFF1493)
            .fillCircle(12, 12, 10)
            .lineStyle(2, 0x000000)
            .strokeCircle(12, 12, 10)
            .generateTexture('token', 24, 24)
            .destroy();

        // Create platform sprite texture
        this.add.graphics()
            .fillStyle(0x8B4513)
            .fillRect(0, 0, 64, 32)
            .lineStyle(2, 0x000000)
            .strokeRect(0, 0, 64, 32)
            .generateTexture('platform', 64, 32)
            .destroy();

        // Create tree sprite texture
        this.add.graphics()
            .fillStyle(0x228B22)
            .fillRect(0, 0, 48, 48)
            .lineStyle(2, 0x000000)
            .strokeRect(0, 0, 48, 48)
            .generateTexture('tree', 48, 48)
            .destroy();

        // Create flower sprite texture
        this.add.graphics()
            .fillStyle(0xFFB6C1)
            .fillCircle(8, 8, 6)
            .lineStyle(2, 0x000000)
            .strokeCircle(8, 8, 6)
            .generateTexture('flower', 16, 16)
            .destroy();
    }

    createLevel() {
        // Simple level layouts that vary slightly
        this.levelLayouts = [
            { tokenX: 700, tokenY: 200, platforms: [[400, 550], [600, 400], [200, 300]] },
            { tokenX: 150, tokenY: 150, platforms: [[300, 550], [500, 350], [100, 200]] },
            { tokenX: 650, tokenY: 450, platforms: [[200, 550], [400, 400], [600, 250]] },
            { tokenX: 400, tokenY: 100, platforms: [[100, 550], [300, 350], [500, 200]] },
            { tokenX: 750, tokenY: 350, platforms: [[150, 550], [350, 450], [550, 300]] }
        ];
    }

    createPlatforms() {
        // Ground
        for (let x = 0; x < 800; x += 64) {
            const platform = this.add.image(x + 32, 580, 'platform');
            this.physics.add.existing(platform, true); // true makes it static
            this.platforms.add(platform);
        }

        // Level-specific platforms
        const layout = this.levelLayouts[(this.currentLevel - 1) % this.levelLayouts.length];
        layout.platforms.forEach(([x, y]) => {
            const platform = this.add.image(x, y, 'platform');
            this.physics.add.existing(platform, true); // true makes it static
            this.platforms.add(platform);
        });
    }

    createLoveToken() {
        const layout = this.levelLayouts[(this.currentLevel - 1) % this.levelLayouts.length];
        this.token = this.add.image(layout.tokenX, layout.tokenY, 'token');
        this.physics.add.existing(this.token);
        this.token.body.setSize(20, 20);
        
        // Add floating animation to token
        this.tweens.add({
            targets: this.token,
            y: this.token.y - 10,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Add sparkle effect
        this.time.addEvent({
            delay: 500,
            callback: () => {
                if (this.token && this.token.active) {
                    this.createSparkle(this.token.x, this.token.y);
                }
            },
            loop: true
        });
    }

    createSparkle(x, y) {
        const sparkle = this.add.circle(x + Phaser.Math.Between(-15, 15), 
                                       y + Phaser.Math.Between(-15, 15), 
                                       2, 0xFFFFFF);
        this.tweens.add({
            targets: sparkle,
            alpha: 0,
            scale: 2,
            duration: 800,
            ease: 'Power2',
            onComplete: () => sparkle.destroy()
        });
    }

    addDecorations() {
        // Add some trees and flowers for ambiance
        const decorations = [
            { type: 'tree', x: 50, y: 520 },
            { type: 'tree', x: 750, y: 520 },
            { type: 'flower', x: 300, y: 560 },
            { type: 'flower', x: 500, y: 560 },
            { type: 'flower', x: 600, y: 560 }
        ];

        decorations.forEach(dec => {
            this.add.image(dec.x, dec.y, dec.type);
        });

        // Add floating hearts in background
        for (let i = 0; i < 5; i++) {
            this.time.delayedCall(i * 2000, () => {
                this.createFloatingHeart();
            });
        }
    }

    createFloatingHeart() {
        const heart = this.add.text(Phaser.Math.Between(50, 750), 650, '💖', {
            fontSize: '20px'
        });

        this.tweens.add({
            targets: heart,
            y: -50,
            alpha: 0.3,
            duration: 8000,
            ease: 'Linear',
            onComplete: () => {
                heart.destroy();
                // Create another heart
                this.time.delayedCall(Phaser.Math.Between(3000, 8000), () => {
                    if (this.scene.isActive()) {
                        this.createFloatingHeart();
                    }
                });
            }
        });
    }

    update() {
        if (!this.player) return;

        // Player movement
        const speed = 200;
        
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.player.body.setVelocityX(speed);
        } else {
            this.player.body.setVelocityX(0);
        }

        if ((this.cursors.up.isDown || this.wasd.W.isDown) && this.player.body.touching.down) {
            this.player.body.setVelocityY(-400);
        }
    }

    collectToken() {
        // Remove token
        this.token.destroy();
        
        // Create collection effect
        this.createCollectionEffect();
        
        // Show love message
        this.showLoveMessage();
    }

    createCollectionEffect() {
        // Heart burst effect
        for (let i = 0; i < 8; i++) {
            const heart = this.add.text(this.token.x, this.token.y, '💖', {
                fontSize: '16px'
            });

            const angle = (i / 8) * Math.PI * 2;
            const distance = 100;

            this.tweens.add({
                targets: heart,
                x: this.token.x + Math.cos(angle) * distance,
                y: this.token.y + Math.sin(angle) * distance,
                alpha: 0,
                scale: 0.5,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => heart.destroy()
            });
        }
    }

    showStartMessage() {
        const startText = this.add.text(400, 300, 'Welcome to your Love Quest!\n\nCollect the love tokens to discover\n25 reasons why I love you!\n\nPress any key to start', {
            fontSize: '24px',
            fill: '#FFFFFF',
            align: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: { x: 20, y: 20 }
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown', () => {
            startText.destroy();
            this.gameStarted = true;
        });
    }

    showLoveMessage() {
        const message = loveMessages[this.currentLevel - 1];
        
        // Update modal content
        document.getElementById('message-title').textContent = `Reason #${message.id}`;
        document.getElementById('message-text').textContent = message.text;
        
        // Handle media
        const mediaContainer = document.getElementById('message-media');
        mediaContainer.innerHTML = '';
        
        if (message.image) {
            const img = document.createElement('img');
            img.src = message.image;
            img.alt = 'Love memory';
            img.onerror = () => {
                // If image doesn't exist, show a placeholder
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIFBsYWNlaG9sZGVyPC90ZXh0Pjwvc3ZnPg==';
            };
            mediaContainer.appendChild(img);
        }
        
        if (message.video) {
            const video = document.createElement('video');
            video.src = message.video;
            video.controls = true;
            video.style.maxWidth = '100%';
            video.onerror = () => {
                // If video doesn't exist, show a placeholder
                video.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.style.cssText = 'background: #f0f0f0; padding: 20px; border-radius: 10px; color: #999;';
                placeholder.textContent = 'Video placeholder - Add your video to assets/media/';
                mediaContainer.appendChild(placeholder);
            };
            mediaContainer.appendChild(video);
        }
        
        // Show modal
        document.getElementById('love-modal').classList.remove('hidden');
        
        // Pause game
        this.scene.pause();
    }

    nextLevel() {
        this.currentLevel++;
        document.getElementById('current-level').textContent = this.currentLevel;
        
        if (this.currentLevel > 25) {
            this.showFinalCelebration();
            return;
        }
        
        // Hide modal
        document.getElementById('love-modal').classList.add('hidden');
        
        // Resume the scene first
        this.scene.resume();
        
        // Restart scene for next level
        this.scene.restart();
    }

    showFinalCelebration() {
        document.getElementById('love-modal').classList.add('hidden');
        document.getElementById('final-modal').classList.remove('hidden');
        
        // Update final message
        const finalModalContent = document.querySelector('#final-modal .modal-content');
        finalModalContent.querySelector('h2').textContent = finalMessage.title;
        finalModalContent.querySelector('p').textContent = finalMessage.text;
    }

    restart() {
        this.currentLevel = 1;
        document.getElementById('current-level').textContent = this.currentLevel;
        document.getElementById('final-modal').classList.add('hidden');
        this.scene.restart();
    }
}

class LoveQuestGame {
    constructor() {
        this.init();
    }

    init() {
        // Phaser 3 Configuration
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-game',
            backgroundColor: '#87CEEB',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: GameScene
        };

        this.game = new Phaser.Game(config);
        
        // Wait for the scene to be created before setting up event listeners
        this.game.events.once('ready', () => {
            this.gameScene = this.game.scene.getScene('GameScene');
            this.setupEventListeners();
        });
    }

    setupEventListeners() {
        // Next level button
        document.getElementById('next-level-btn').addEventListener('click', () => {
            const scene = this.game.scene.getScene('GameScene');
            if (scene) {
                scene.nextLevel();
                // Resume the scene
                scene.scene.resume();
            }
        });

        // Restart button
        document.getElementById('restart-btn').addEventListener('click', () => {
            const scene = this.game.scene.getScene('GameScene');
            if (scene) {
                scene.restart();
            }
        });

        // Close modal on background click
        document.getElementById('love-modal').addEventListener('click', (e) => {
            if (e.target.id === 'love-modal') {
                const scene = this.game.scene.getScene('GameScene');
                if (scene) {
                    scene.nextLevel();
                    scene.scene.resume();
                }
            }
        });

        document.getElementById('final-modal').addEventListener('click', (e) => {
            if (e.target.id === 'final-modal') {
                const scene = this.game.scene.getScene('GameScene');
                if (scene) {
                    scene.restart();
                }
            }
        });

        // Add keyboard shortcut to close modal (ESC or SPACE)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === ' ') {
                const loveModal = document.getElementById('love-modal');
                const finalModal = document.getElementById('final-modal');
                
                if (!loveModal.classList.contains('hidden')) {
                    const scene = this.game.scene.getScene('GameScene');
                    if (scene) {
                        scene.nextLevel();
                        scene.scene.resume();
                    }
                } else if (!finalModal.classList.contains('hidden')) {
                    const scene = this.game.scene.getScene('GameScene');
                    if (scene) {
                        scene.restart();
                    }
                }
            }
        });
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    new LoveQuestGame();
}); 