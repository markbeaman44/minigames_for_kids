import baseUI from "./baseUI.js";
import animationUI from "./animationUI.js";
import * as helpers from "./helper.js";
export default class Drawing extends Phaser.Scene {
    constructor() {
        super({ key: 'level1' });
        this.drawing = false;
        this.points = [];
        this.currentColor = 0x000000;
        this.lineThickness = 5;
        this.bucketMode = false;
        this.clearMe = false;
        this.justCleared = false;
        this.fillGraphicsList = [];
        this.shapeGraphicsList = [];
    }
    preload() {
        this.load.image('background1', 'assets/levelOne.png');
        this.load.image('pencil', 'assets/pencilButton.png');
        this.load.image('bucket', 'assets/bucketButton.png');
        this.load.image('play', 'assets/playButton.png');
        this.load.image('clear', 'assets/clearButton.png');
        this.load.image('home', 'assets/homeButton.png');
        this.input.setDefaultCursor('default');
    }
    create() {
        // Initialize classes
        this.baseUI = new baseUI(this, "18px");
        this.animationUI = new animationUI(this);
        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background1')
            .disableInteractive();
        let pencilButton = this.baseUI.addInteractiveImage(-100, 335, 'pencil', 0.3, () => {
            this.bucketMode = false;
        });
        let bucketButton = this.baseUI.addInteractiveImage(-200, 335, 'bucket', 0.3, () => {
            this.bucketMode = true;
            // option 2
            this.bucketFill();
        });
        let playButton = this.baseUI.addInteractiveImage(0, 335, 'play', 0.3, () => {
            this.animateDrawing();
        });
        let clearButton = this.baseUI.addInteractiveImage(100, 335, 'clear', 0.3, () => {
            this.graphics.clear();
            this.clearMe = true;
            // // option 1
            // this.justCleared = true; 
            // //
            this.bucketFill();
        });
        let homeButton = this.baseUI.addInteractiveImage(200, 335, 'home', 0.3, () => {
            this.scene.start(`mainMenu`);
        });
        this.containerGroup = this.add.container(this.scale.width / 2, this.scale.height / 2, [pencilButton, bucketButton, playButton, clearButton, homeButton]);
        this.graphics = this.add.graphics();
        this.backgroundGrid();
        this.gridSet();
        this.slider();
        this.input.on('pointerdown', (pointer) => {
            if (this.isPointerInsideGrid(pointer.x, pointer.y)) {
                this.clearMe = false;
                this.input.setDefaultCursor('crosshair');
                this.drawing = true;
                this.points = [{ x: pointer.x, y: pointer.y }];
                this.graphics.lineStyle(this.lineThickness, this.currentColor);
                this.graphics.beginPath();
                this.graphics.moveTo(pointer.x, pointer.y);
            }
            else {
                this.drawing = false;
            }
        });
        this.input.on('pointermove', (pointer) => {
            if (this.drawing && this.isPointerInsideGrid(pointer.x, pointer.y)) {
                this.input.setDefaultCursor('crosshair');
                this.points.push({ x: pointer.x, y: pointer.y });
                this.graphics.lineTo(pointer.x, pointer.y);
                this.graphics.strokePath();
                this.graphics.setDepth(this.points.length + 1);
                this.clearMe = false;
            }
        });
        this.input.on('pointerup', () => {
            // // option 1
            // if (this.justCleared) {
            //     this.justCleared = false; // reset flag, but skip the rest
            //     return;
            // }
            // if (this.bucketMode) {
            //     this.bucketFill();
            // }
            // //
            this.input.setDefaultCursor('default');
            this.drawing = false;
            this.clearMe = false;
        });
        this.resizeGame(this.scale.gameSize);
        this.scale.on("resize", this.resizeGame, this);
    }
    backgroundGrid() {
        const colorGridX = 0;
        const colorGridY = -150;
        const backgroundWidth = 1200;
        const backgroundHeight = 850;
        this.gridBorder = this.add.rectangle(colorGridX, colorGridY, backgroundWidth, backgroundHeight, 0xffffff)
            .setStrokeStyle(4, 0x808080);
        this.containerGroup.add(this.gridBorder);
    }
    gridSet() {
        const colors = [
            0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0x000000, 0xffffff, 0xff8800, 0x0088ff,
            0x8844ff, 0xff44aa, 0x88ff44, 0x44ffaa, 0xaaffff, 0x888888, 0xcc0000, 0x00cc00, 0x0000cc, 0xcccc00,
            0xcc00cc, 0x00cccc, 0x444444, 0xaaaaaa, 0xff6666, 0x66ff66, 0x6666ff, 0xffff66, 0xff66ff, 0x66ffff
        ];
        const colorGridX = -275;
        const colorGridY = 395;
        const boxSize = 45;
        const padding = 10;
        const cols = 10;
        const rows = 3;
        const backgroundPadding = 15;
        const cornerRadius = 15;
        const backgroundWidth = cols * (boxSize + padding) - padding + backgroundPadding + 10;
        const backgroundHeight = rows * (boxSize + padding) - padding + backgroundPadding + 10;
        let gridBorder = this.add.graphics();
        gridBorder.fillStyle(0x333333, 0.9);
        gridBorder.fillRoundedRect(colorGridX - backgroundPadding / 2, colorGridY - backgroundPadding / 2, backgroundWidth, backgroundHeight, cornerRadius);
        gridBorder.lineStyle(2, 0x222222);
        gridBorder.strokeRoundedRect(colorGridX - backgroundPadding / 2, colorGridY - backgroundPadding / 2, backgroundWidth, backgroundHeight, cornerRadius);
        this.containerGroup.add(gridBorder);
        for (let i = 0; i < colors.length; i++) {
            let row = Math.floor(i / cols);
            let col = i % cols;
            let colorBox = this.add.rectangle(colorGridX + col * (boxSize + padding) + 27.5, colorGridY + row * (boxSize + padding) + 27.5, boxSize, boxSize, colors[i]).setInteractive().setStrokeStyle(2, 0x222222);
            colorBox.on('pointerover', () => { this.input.setDefaultCursor('pointer'); });
            colorBox.on('pointerout', () => { this.input.setDefaultCursor('default'); });
            colorBox.on('pointerdown', () => {
                this.currentColor = colors[i];
                if (this.sliderKnob) {
                    this.sliderKnob.fillColor = this.currentColor;
                }
            });
            this.containerGroup.add(colorBox);
        }
    }
    slider() {
        const sliderX = -350;
        const sliderY = 405;
        const sliderWidth = 40;
        const sliderHeight = 150;
        const sliderPadding = 15;
        const sliderCornerRadius = 15;
        let minY = sliderY + sliderCornerRadius;
        let maxY = sliderY + sliderHeight - sliderCornerRadius;
        let sliderGraphics = this.add.graphics();
        sliderGraphics.fillStyle(0x333333, 0.9);
        sliderGraphics.fillRoundedRect(sliderX - sliderPadding / 2, sliderY - sliderPadding / 2, sliderWidth + sliderPadding, sliderHeight + sliderPadding, sliderCornerRadius);
        sliderGraphics.lineStyle(2, 0x222222);
        sliderGraphics.strokeRoundedRect(sliderX - sliderPadding / 2, sliderY - sliderPadding / 2, sliderWidth + sliderPadding, sliderHeight + sliderPadding, sliderCornerRadius);
        this.sliderKnob = this.add.rectangle(sliderX + 20, maxY, sliderWidth - 10, sliderWidth - 10, this.currentColor) // Draggable Knob
            .setInteractive({ draggable: true });
        this.input.setDraggable(this.sliderKnob);
        this.sliderKnob.on('drag', (pointer, dragX, dragY) => {
            this.sliderKnob.y = Phaser.Math.Clamp(dragY, minY, maxY);
            this.lineThickness = Phaser.Math.Linear(100, 1, (this.sliderKnob.y - minY) / (maxY - minY));
        });
        this.containerGroup.add([sliderGraphics, this.sliderKnob]);
    }
    bucketFill() {
        // Clear all previous fillGraphics and shapeGraphics
        if (this.clearMe) {
            console.log("Clearing all fills");
            this.fillGraphicsList.forEach(graphics => {
                console.log("Destroying fillGraphics");
                graphics.destroy();
            });
            this.shapeGraphicsList.forEach(graphics => {
                console.log("Destroying shapeGraphics");
                graphics.destroy();
            });
            this.fillGraphicsList = [];
            this.shapeGraphicsList = [];
            this.clearMe = false;
            return;
        }
        let fillGraphics = this.add.graphics();
        let shapeGraphics = this.add.graphics();
        this.fillGraphicsList.push(fillGraphics);
        this.shapeGraphicsList.push(shapeGraphics);
        shapeGraphics.fillStyle(this.currentColor, 1);
        shapeGraphics.beginPath();
        shapeGraphics.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            shapeGraphics.lineTo(this.points[i].x, this.points[i].y);
        }
        shapeGraphics.closePath();
        shapeGraphics.fillPath();
        fillGraphics.fillStyle(this.currentColor, 1);
        fillGraphics.fillRect(0, 0, this.scale.width, this.scale.height); // Full-screen fill
        fillGraphics.setMask(shapeGraphics.createGeometryMask());
        shapeGraphics.setVisible(false);
    }
    // 🎭 Converts the drawing to a texture & applies animation to it
    animateDrawing() {
        const minX = Math.min(...this.points.map(p => p.x));
        const minY = Math.min(...this.points.map(p => p.y));
        const maxX = Math.max(...this.points.map(p => p.x));
        const maxY = Math.max(...this.points.map(p => p.y));
        const width = maxX - minX;
        const height = maxY - minY;
        this.animationUI.applyRandomAnimation([this.graphics, ...this.fillGraphicsList, ...this.shapeGraphicsList], minX + width / 2, minY + height / 2);
    }
    isPointerInsideGrid(x, y) {
        let { left, right, top, bottom } = this.gridBorder.getBounds();
        return (x >= left &&
            x <= right &&
            y >= top &&
            y <= bottom);
    }
    resizeGame(gameSize) {
        let { width, height } = gameSize;
        // Background
        let scaleX = width / this.background.width;
        let scaleY = height / this.background.height;
        this.background.setScale(scaleX, scaleY);
        this.background.setPosition(width / 2, height / 2);
        let { scaleFactorX, scaleFactorY } = helpers.getScreenSize(width, height);
        this.containerGroup.setScale(scaleFactorX, scaleFactorY);
        this.containerGroup.setPosition(width / 2, height / 2);
        this.graphics.clear();
        this.clearMe = true;
        this.bucketFill();
    }
}
