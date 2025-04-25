export default class Drawing extends Phaser.Scene {
    constructor() {
        super({ key: 'level3' });
        // private baseUI!: baseUI;
        // private animationUI!: animationUI;
        // private graphics!: Phaser.GameObjects.Graphics;
        // private background!: Phaser.GameObjects.Image;
        // private gridBorder!: Phaser.GameObjects.Rectangle;
        // private containerGroup!: Phaser.GameObjects.Container;
        // private drawing: boolean = false;
        // private points: { x: number; y: number }[] = [];
        // private currentColor: number = 0x000000;
        // private lineThickness: number = 5;
        // private bucketMode: boolean = false;
        // private clearMe: boolean = false;
        // private justCleared: boolean = false;
        // private fillGraphicsList: Phaser.GameObjects.Graphics[] = [];
        // private shapeGraphicsList: Phaser.GameObjects.Graphics[] = [];
        // private sliderKnob!: Phaser.GameObjects.Rectangle;
        this.animals = [
            // Farm animals
            "🐄",
            "🐖",
            "🐑",
            "🐓",
            "🐎",
            "🐐",
            "🦃",
            "🦆",
            "🐇",
            "🐕",
            "🐈",
            // Wild animals
            "🦁",
            "🐘",
            "🦒",
            "🦓",
            "🦏",
            "🐅",
            "🐆",
            "🦬",
            "🦘",
            // Forest animals
            "🦊",
            "🐿️",
            "🦔",
            "🦡",
            "🦝",
            "🐺",
            "🦌",
            // Sea creatures
            "🐬",
            "🐳",
            "🦭",
            "🐙",
            "🦑",
            "🦐",
            "🦞",
            "🐠",
            "🐡",
            "🦈",
            // Insects
            "🦋",
            "🐝",
            "🐞",
            "🦗",
            "🐜",
        ];
        this.currentAnimal = '';
        this.totalBalloons = 5;
    }
    preload() {
        this.input.setDefaultCursor('default');
    }
    create() {
        this.balloonGroup = this.add.group();
        this.targetText = this.add.text(400, 20, '', {
            fontSize: '28px',
            color: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);
        this.startRound();
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            if (gameObject.animal === this.currentAnimal) {
                this.totalBalloons++;
            }
            else {
                this.totalBalloons = 5;
            }
            this.balloonGroup.clear(true, true);
            this.startRound();
        });
    }
    startRound() {
        this.currentAnimal = Phaser.Utils.Array.GetRandom(this.animals);
        this.targetText.setText(`Find: ${this.currentAnimal}`);
        this.physics.add.collider(this.balloonGroup, this.balloonGroup);
        for (let i = 0; i < this.totalBalloons; i++) {
            const x = Phaser.Math.Between(50, 750);
            const y = 150;
            const speed = Phaser.Math.Between(20, 100);
            const animal = Phaser.Utils.Array.GetRandom(this.animals);
            const balloonEmoji = this.add.text(0, 0, '🎈', {
                fontSize: '180px',
                padding: { top: 30, bottom: 30 }
            });
            const animalLabel = this.add.text(70, 80, animal, {
                fontSize: '90px',
                padding: { top: 30, bottom: 30 }
            }).setOrigin(0.5);
            // Create container with both
            const balloon = this.add.container(x, y, [balloonEmoji, animalLabel]).setSize(180, 250);
            this.physics.add.existing(balloon);
            const bBody = balloon.body;
            bBody.setVelocityY(speed);
            bBody.setVelocityX(Phaser.Math.Between(-50, 50));
            bBody.setBounce(1);
            bBody.setCollideWorldBounds(true);
            balloon.setInteractive(new Phaser.Geom.Rectangle(0, 0, 180, 250), Phaser.Geom.Rectangle.Contains);
            balloon.setData('animal', animal);
            // Add to group
            this.balloonGroup.add(balloon);
            // this.tweens.add({
            //     targets: balloon,
            //     y: 600,
            //     duration: 20000,
            //     onUpdate: () => {
            //         const label = balloon.getData('text');
            //         if (label) label.y = balloon.y;
            //     },
            //     onComplete: () => {
            //         // Reset game on miss
            //         this.totalBalloons = 5;
            //         this.balloonGroup.clear(true, true);
            //         this.startRound.call(this);
            //     }
            // });
        }
    }
}
