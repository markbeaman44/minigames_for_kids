const animationDuration = 500;
export default class animationUI {
    constructor(scene) {
        this.scene = scene;
    }
    applyRandomAnimation(target, x, y, onComplete) {
        const animations = ['grow', 'shrink', 'bounce', 'spin', 'shake', 'wiggle', 'flip', 'ghost', 'warp'];
        const colorAnimations = ['colorShift', 'rainbow', 'glow', 'firework', 'neon'];
        // Choose random animation from each list
        const randomAnimation = Phaser.Utils.Array.GetRandom(animations);
        const randomColorAnimation = Phaser.Utils.Array.GetRandom(colorAnimations);
        if (randomAnimation === 'grow') {
            this.scene.tweens.add({
                targets: target,
                scale: { from: 1, to: 3 },
                duration: animationDuration,
                yoyo: true,
                repeat: 2,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }
        else if (randomAnimation === 'shrink') {
            this.scene.tweens.add({
                targets: target,
                scale: { from: 1, to: 0.2 },
                duration: animationDuration,
                yoyo: true,
                repeat: 2,
                ease: 'Sine.easeInOut',
            });
        }
        else if (randomAnimation === 'wiggle') {
            this.scene.tweens.add({
                targets: target,
                x: {
                    from: x - (Phaser.Math.Between(0, 1) === 0 ? -10 : 10),
                    to: x + (Phaser.Math.Between(0, 1) === 0 ? -10 : 10)
                },
                duration: animationDuration,
                yoyo: true,
                repeat: 10,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }
        else if (randomAnimation === 'bounce') {
            this.scene.tweens.add({
                targets: target,
                y: y - 100,
                duration: animationDuration,
                yoyo: true,
                repeat: 4,
                ease: 'Bounce.easeOut',
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }
        else if (randomAnimation === 'spin') {
            this.scene.tweens.add({
                targets: target,
                angle: 720,
                duration: animationDuration,
                ease: 'Quad.easeInOut',
                repeat: 1,
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }
        else if (randomAnimation === 'shake') {
            this.scene.tweens.add({
                targets: target,
                x: x + (Phaser.Math.Between(0, 1) === 0 ? -30 : 30),
                duration: animationDuration,
                yoyo: true,
                repeat: 4,
                ease: 'Linear',
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }
        else if (randomAnimation === 'flip') {
            this.scene.tweens.add({
                targets: target,
                scaleX: { from: 1, to: -1 },
                duration: animationDuration,
                yoyo: true,
                repeat: 3,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
            this.scene.tweens.add({
                targets: target,
                scaleY: { from: 1, to: -1 },
                duration: animationDuration,
                yoyo: true,
                repeat: 3,
                ease: 'Sine.easeInOut',
                delay: 100,
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }
        else if (randomAnimation === 'ghost') {
            this.scene.tweens.add({
                targets: target,
                alpha: { from: 1, to: 0.2 },
                duration: animationDuration,
                yoyo: true,
                repeat: 5,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
            target.forEach(obj => {
                this.scene.tweens.add({
                    targets: obj,
                    alpha: { from: 1, to: 0.3 },
                    y: obj.y - 20,
                    duration: animationDuration,
                    yoyo: true,
                    repeat: 3,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        if (onComplete) {
                            onComplete();
                        }
                    }
                });
            });
        }
        else if (randomAnimation === 'warp') {
            this.scene.tweens.add({
                targets: target,
                scaleX: { from: 1, to: 0.2 },
                scaleY: { from: 1, to: 2 },
                duration: animationDuration,
                yoyo: true,
                repeat: 3,
                ease: 'Sine.easeInOut',
            });
            this.scene.tweens.add({
                targets: target,
                angle: 360,
                duration: animationDuration,
                ease: 'Cubic.easeInOut',
                repeat: 1,
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }
        // Handle color animations
        if (randomColorAnimation === 'colorShift') {
            // Color shift that smoothly changes between a range of colors
            this.scene.tweens.add({
                targets: target,
                tint: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff],
                duration: animationDuration,
                yoyo: true,
                repeat: 8,
                ease: 'Linear',
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }
        else if (randomColorAnimation === 'rainbow') {
            // Random rainbow color change over time
            this.scene.tweens.add({
                targets: target,
                tint: Phaser.Display.Color.RandomRGB().color,
                duration: animationDuration,
                yoyo: true,
                repeat: -1,
                ease: 'Linear',
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }
        else if (randomColorAnimation === 'glow') {
            // Apply a glowing effect by alternating alpha values
            this.scene.tweens.add({
                targets: target,
                alpha: { from: 1, to: 0.5 },
                duration: animationDuration,
                yoyo: true,
                repeat: 6,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }
        else if (randomColorAnimation === 'firework') {
            // Firework effect: Flashing with random color and growing
            this.scene.tweens.add({
                targets: target,
                scale: { from: 1, to: 4 },
                alpha: { from: 1, to: 0.5 },
                tint: Phaser.Display.Color.RandomRGB().color,
                duration: animationDuration,
                ease: 'Quad.easeOut',
                yoyo: true,
                repeat: 4,
                onComplete: () => {
                    this.scene.tweens.add({
                        targets: target,
                        scale: 1,
                        alpha: 1,
                        duration: 200,
                        ease: 'Linear'
                    });
                    this.scene.time.delayedCall(200, () => {
                        if (onComplete) {
                            onComplete();
                        }
                        ;
                    });
                }
            });
        }
        else if (randomColorAnimation === 'neon') {
            // Neon effect: alternating color shift and alpha pulse
            this.scene.tweens.add({
                targets: target,
                tint: Phaser.Display.Color.RandomRGB().color,
                alpha: { from: 0.5, to: 1 },
                duration: animationDuration,
                yoyo: true,
                repeat: 6,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }
    }
}
