import baseUI from './baseUI';
import animationUI from './animationUI';

export default class Drawing extends Phaser.Scene {
    constructor() {
        super({ key: 'level3' });
    }

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

    private animals = [
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
      ]
    private currentAnimal = '';
    private balloonGroup;
    private targetText;
    private totalBalloons = 5;

    preload() {
        this.input.setDefaultCursor('default')
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
            } else {
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
            
            const bBody = balloon.body as Phaser.Physics.Arcade.Body;
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

    // create() {
    //     // Initialize classes
    //     this.baseUI = new baseUI(this, "18px");
    //     this.animationUI = new animationUI(this);

    //     this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background1')
    //         .disableInteractive();

    //     let pencilButton = this.baseUI.addInteractiveImage(-100, 360, 'pencil', 0.3, () => {
    //         this.bucketMode = false;
    //     });

    //     let bucketButton = this.baseUI.addInteractiveImage(-200, 360, 'bucket', 0.3, () => {
    //         this.bucketMode = true;
    //         // option 2
    //         this.bucketFill();
    //     });

    //     let playButton = this.baseUI.addInteractiveImage(0, 360, 'play', 0.3, () => { 
    //         this.animateDrawing(); 
    //     });

    //     let clearButton = this.baseUI.addInteractiveImage(100, 360, 'clear', 0.3, () => {
    //         this.graphics.clear();
    //         this.clearMe = true;
    //         // // option 1
    //         // this.justCleared = true; 
    //         // //
    //         this.bucketFill();
    //     });

    //     let homeButton = this.baseUI.addInteractiveImage(200, 360, 'home', 0.3, () => { 
    //         this.scene.start(`mainMenu`);
    //     });

    //     this.containerGroup = this.add.container(this.scale.width / 2, this.scale.height / 2,
    //         [ pencilButton, bucketButton, playButton, clearButton, homeButton ]);

    //     this.graphics = this.add.graphics();
        
    //     this.backgroundGrid();
    //     this.gridSet();
    //     this.slider();

    //     this.input.on('pointerdown', (pointer) => {
    //         if (this.isPointerInsideGrid(pointer.x, pointer.y)) {
    //             this.clearMe = false;
    //             this.input.setDefaultCursor('crosshair');
    //             this.drawing = true;
    //             this.points = [{ x: pointer.x, y: pointer.y }];
    //             this.graphics.lineStyle(this.lineThickness, this.currentColor);
    //             this.graphics.beginPath();
    //             this.graphics.moveTo(pointer.x, pointer.y);
    //         } else {
    //             this.drawing = false;
    //         }
    //     });
        
    //     this.input.on('pointermove', (pointer) => {
    //         if (this.drawing && this.isPointerInsideGrid(pointer.x, pointer.y)) {
    //             this.input.setDefaultCursor('crosshair');
    //             this.points.push({ x: pointer.x, y: pointer.y });
    //             this.graphics.lineTo(pointer.x, pointer.y);
    //             this.graphics.strokePath();
    //             this.graphics.setDepth(this.points.length + 1);
    //             this.clearMe = false;
    //         }
    //     });
        
    //     this.input.on('pointerup', () => {
    //         // // option 1
    //         // if (this.justCleared) {
    //         //     this.justCleared = false; // reset flag, but skip the rest
    //         //     return;
    //         // }
    //         // if (this.bucketMode) {
    //         //     this.bucketFill();
    //         // }
    //         // //
    //         this.input.setDefaultCursor('default');
    //         this.drawing = false;
    //         this.clearMe = false;
    //     });

    //     this.resizeGame(this.scale.gameSize);
    //     this.scale.on("resize", this.resizeGame, this);
    // }

    // backgroundGrid() {
    //     const colorGridX = 0;  
    //     const colorGridY = -150; 
    //     const backgroundWidth = 1200;
    //     const backgroundHeight = 850;
        
    //     this.gridBorder = this.add.rectangle(colorGridX, colorGridY, backgroundWidth, backgroundHeight, 0xffffff)
    //         .setStrokeStyle(4, 0x808080);

    //     this.containerGroup.add(this.gridBorder);
    // }

    // gridSet() {
    //     const colors = [
    //         0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0x000000, 0xffffff, 0xff8800, 0x0088ff,
    //         0x8844ff, 0xff44aa, 0x88ff44, 0x44ffaa, 0xaaffff, 0x888888, 0xcc0000, 0x00cc00, 0x0000cc, 0xcccc00,
    //         0xcc00cc, 0x00cccc, 0x444444, 0xaaaaaa, 0xff6666, 0x66ff66, 0x6666ff, 0xffff66, 0xff66ff, 0x66ffff
    //     ];
        
    //     const colorGridX = -275;  
    //     const colorGridY = 420; 
    //     const boxSize = 45; 
    //     const padding = 10; 
    //     const cols = 10;
    //     const rows = 3; 
    //     const backgroundPadding = 15;
    //     const cornerRadius = 15;
    //     const backgroundWidth = cols * (boxSize + padding) - padding + backgroundPadding + 10;
    //     const backgroundHeight = rows * (boxSize + padding) - padding + backgroundPadding + 10;
        
    //     let gridBorder = this.add.graphics();
    //     gridBorder.fillStyle(0x333333, 0.9);
    //     gridBorder.fillRoundedRect(
    //         colorGridX - backgroundPadding / 2, 
    //         colorGridY - backgroundPadding / 2, 
    //         backgroundWidth, 
    //         backgroundHeight, 
    //         cornerRadius
    //     );
    //     gridBorder.lineStyle(2, 0x222222);
    //     gridBorder.strokeRoundedRect(
    //         colorGridX - backgroundPadding / 2, 
    //         colorGridY - backgroundPadding / 2, 
    //         backgroundWidth, 
    //         backgroundHeight, 
    //         cornerRadius
    //     );
    //     this.containerGroup.add(gridBorder);
        
    //     for (let i = 0; i < colors.length; i++) {
    //         let row = Math.floor(i / cols);
    //         let col = i % cols;
            
    //         let colorBox = this.add.rectangle(
    //             colorGridX + col * (boxSize + padding) + 27.5,
    //             colorGridY + row * (boxSize + padding) + 27.5,
    //             boxSize, boxSize,
    //             colors[i]
    //         ).setInteractive().setStrokeStyle(2, 0x222222);

    //         colorBox.on('pointerover', () => { this.input.setDefaultCursor('pointer') })
    //         colorBox.on('pointerout', () => { this.input.setDefaultCursor('default') })
    //         colorBox.on('pointerdown', () => {
    //             this.currentColor = colors[i];
    //             if (this.sliderKnob) {
    //                 this.sliderKnob.fillColor = this.currentColor;
    //             }
    //         });
            
    //         this.containerGroup.add(colorBox);
    //     }
    // }

    // slider() {
    //     const sliderX = -350;
    //     const sliderY = 430; 
    //     const sliderWidth = 40; 
    //     const sliderHeight = 150; 
    //     const sliderPadding = 15;
    //     const sliderCornerRadius = 15;
    //     let minY = sliderY + sliderCornerRadius;
    //     let maxY = sliderY + sliderHeight - sliderCornerRadius;

    //     let sliderGraphics = this.add.graphics();
    //     sliderGraphics.fillStyle(0x333333, 0.9); 
    //     sliderGraphics.fillRoundedRect(
    //         sliderX - sliderPadding / 2, 
    //         sliderY - sliderPadding / 2, 
    //         sliderWidth + sliderPadding, 
    //         sliderHeight + sliderPadding, 
    //         sliderCornerRadius
    //     );
    //     sliderGraphics.lineStyle(2, 0x222222);
    //     sliderGraphics.strokeRoundedRect(
    //         sliderX - sliderPadding / 2, 
    //         sliderY - sliderPadding / 2, 
    //         sliderWidth + sliderPadding, 
    //         sliderHeight + sliderPadding, 
    //         sliderCornerRadius
    //     );

    //     this.sliderKnob = this.add.rectangle(sliderX + 20, maxY, sliderWidth - 10, sliderWidth - 10, this.currentColor) // Draggable Knob
    //         .setInteractive({ draggable: true });
        
    //     this.input.setDraggable(this.sliderKnob);
        
    //     this.sliderKnob.on('drag', (pointer, dragX, dragY) => {
    //         this.sliderKnob.y = Phaser.Math.Clamp(dragY, minY, maxY);
        
    //         this.lineThickness = Phaser.Math.Linear(100, 1, (this.sliderKnob.y - minY) / (maxY - minY));
    //     });

    //     this.containerGroup.add([sliderGraphics, this.sliderKnob]);
    // }

    // bucketFill() {
    //     // Clear all previous fillGraphics and shapeGraphics
    //     if (this.clearMe) {
    //         console.log("Clearing all fills");
    
    //         this.fillGraphicsList.forEach(graphics => {
    //             console.log("Destroying fillGraphics");
    //             graphics.destroy();
    //         });
    
    //         this.shapeGraphicsList.forEach(graphics => {
    //             console.log("Destroying shapeGraphics");
    //             graphics.destroy();
    //         });
    
    //         this.fillGraphicsList = [];
    //         this.shapeGraphicsList = [];
    
    //         this.clearMe = false;
    //         return;
    //     }
    
    //     let fillGraphics = this.add.graphics();
    //     let shapeGraphics = this.add.graphics();
    
    //     this.fillGraphicsList.push(fillGraphics);
    //     this.shapeGraphicsList.push(shapeGraphics);
    
    //     shapeGraphics.fillStyle(this.currentColor, 1);
    //     shapeGraphics.beginPath();
    //     shapeGraphics.moveTo(this.points[0].x, this.points[0].y);
    //     for (let i = 1; i < this.points.length; i++) {
    //         shapeGraphics.lineTo(this.points[i].x, this.points[i].y);
    //     }
    //     shapeGraphics.closePath();
    //     shapeGraphics.fillPath();
    
    //     fillGraphics.fillStyle(this.currentColor, 1);
    //     fillGraphics.fillRect(0, 0, this.scale.width, this.scale.height); // Full-screen fill
    //     fillGraphics.setMask(shapeGraphics.createGeometryMask());
    
    //     shapeGraphics.setVisible(false);
    // }
    


    // 🎭 Converts the drawing to a texture & applies animation to it
    // animateDrawing() {
    //     const minX = Math.min(...this.points.map(p => p.x));
    //     const minY = Math.min(...this.points.map(p => p.y));
    //     const maxX = Math.max(...this.points.map(p => p.x));
    //     const maxY = Math.max(...this.points.map(p => p.y));
    //     const width = maxX - minX;
    //     const height = maxY - minY;

    //     this.animationUI.applyRandomAnimation([this.graphics, ...this.fillGraphicsList, ...this.shapeGraphicsList], minX + width / 2, minY + height / 2);
    // }

    // isPointerInsideGrid(x, y) {
    //     let { left, right, top, bottom } = this.gridBorder.getBounds();
    //     return (
    //         x >= left &&
    //         x <= right &&
    //         y >= top && 
    //         y <= bottom
    //     );
    // } 

    // resizeGame(gameSize: Phaser.Structs.Size) {
    //     let { width, height } = gameSize;

    //     // Background
    //     let scaleX = width / this.background.width;
    //     let scaleY = height / this.background.height;
    //     this.background.setScale(scaleX, scaleY);
    //     this.background.setPosition(width / 2, height / 2);

    //     let scaleFactorX = width < 600 ? 0.4 : width < 700 ? 0.5 : width < 800 ? 0.6 : width < 1000 ? 0.7 : width < 1200 ? 0.8 : 1;
    //     let scaleFactorY = height < 600 ? 0.4 : height < 700 ? 0.5 : height < 800 ? 0.6 : height < 1000 ? 0.7 : height < 1200 ? 0.8 : 1;
    //     this.containerGroup.setScale(scaleFactorX, scaleFactorY);
    //     this.containerGroup.setPosition(width / 2, height / 2);

    //     this.graphics.clear();
    //     this.clearMe = true;
    //     this.bucketFill();
    // }

}
