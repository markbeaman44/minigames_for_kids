import baseUI from "./baseUI.js";
import animationUI from "./animationUI.js";
export default class Grid extends Phaser.Scene {
    constructor() {
        super({ key: 'level2' });
        this.currentColor = 0x000000;
    }
    preload() {
        this.load.image('background2', 'assets/levelTwo.png');
        this.load.image('grid2', 'assets/levelTwoGrids.png');
        this.load.image('play', 'assets/playButton.png');
        this.load.image('clear', 'assets/clearButton.png');
        this.load.image('home', 'assets/homeButton.png');
        this.input.setDefaultCursor('default');
    }
    create() {
        // Initialize classes
        this.baseUI = new baseUI(this, "18px");
        this.animationUI = new animationUI(this);
        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background2')
            .disableInteractive();
        this.backgroundGrid = this.add.image(0, -100, 'grid2').setScale(0.9);
        this.gridSize = 10;
        this.cellSize = 57.5;
        this.grid = [];
        let playButton = this.baseUI.addInteractiveImage(330, 300, 'play', 0.3, () => {
            this.animateDrawing();
        });
        let clearButton = this.baseUI.addInteractiveImage(330, 400, 'clear', 0.3, () => {
            this.resetGrid();
        });
        let homeButton = this.baseUI.addInteractiveImage(400, -100, 'home', 0.3, () => {
            this.scene.start(`mainMenu`);
        });
        this.containerGroup = this.add.container(this.scale.width / 2, this.scale.height / 2, [this.backgroundGrid, playButton, clearButton, homeButton]);
        // Create grid inside the modal
        for (let row = 0; row < this.gridSize; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.gridSize; col++) {
                let x = col * this.cellSize - 285;
                let y = row * this.cellSize - 386.5;
                let square = this.add.rectangle(x, y, this.cellSize - 2, this.cellSize - 2, 0xffffff).setOrigin(0).setDepth(1002);
                ;
                // Enable interaction
                square.setInteractive();
                square.on('pointerdown', () => {
                    square.fillColor = this.currentColor;
                });
                this.containerGroup.add(square);
                this.grid[row][col] = square;
            }
        }
        this.graphics = this.add.graphics();
        this.gridSet();
        this.resizeGame(this.scale.gameSize);
        this.scale.on("resize", this.resizeGame, this);
    }
    gridSet() {
        const colors = [
            0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0x000000, 0xffffff, 0xff8800, 0x0088ff,
            0x8844ff, 0xff44aa, 0x88ff44, 0x44ffaa, 0xaaffff, 0x888888, 0xcc0000, 0x00cc00, 0x0000cc, 0xcccc00,
            0xcc00cc, 0x00cccc, 0x444444, 0xaaaaaa, 0xff6666, 0x66ff66, 0x6666ff, 0xffff66, 0xff66ff, 0x66ffff
        ];
        const colorGridX = -275;
        const colorGridY = 270;
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
            colorBox.on('pointerdown', () => this.currentColor = colors[i]);
            this.containerGroup.add(colorBox);
        }
    }
    resetGrid() {
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                this.grid[row][col].fillColor = 0xffffff;
            }
        }
    }
    animateDrawing() {
        let gridContainer = this.add.container();
        let gridList = this.grid.flat().filter(square => square.fillColor !== 0xffffff);
        let gridCopy = gridList.map(square => {
            let copy = this.add.rectangle(square.x, square.y, square.width, square.height, square.fillColor);
            copy.setOrigin(square.originX, square.originY); // Match original origin
            copy.setInteractive(); // Make sure the copy is not interactive
            return copy;
        });
        gridCopy.forEach(square => {
            gridContainer.add(square);
        });
        // Hide the original squares
        gridList.forEach(square => {
            square.setAlpha(0);
        });
        gridContainer.setPosition(this.scale.width / 2, this.scale.height / 2);
        this.animationUI.applyRandomAnimation([gridContainer], this.scale.width / 2, this.scale.height / 2, () => {
            gridContainer.destroy();
            // Show the original squares
            gridList.forEach(square => {
                square.setAlpha(1);
            });
        });
    }
    resizeGame(gameSize) {
        let { width, height } = gameSize;
        // Background
        let scaleX = width / this.background.width;
        let scaleY = height / this.background.height;
        this.background.setScale(scaleX, scaleY);
        this.background.setPosition(width / 2, height / 2);
        let scaleFactorX = width < 500 ? 0.45 : width < 600 ? 0.5 : width < 800 ? 0.6 : width < 1000 ? 0.7 : width < 1200 ? 0.8 : 1;
        let scaleFactorY = height < 500 ? 0.45 : height < 600 ? 0.5 : height < 800 ? 0.6 : height < 1000 ? 0.7 : height < 1200 ? 0.8 : 1;
        this.containerGroup.setScale(scaleFactorX, scaleFactorY);
        // Reposition Images within Group
        this.containerGroup.setPosition(width / 2, height / 2);
        this.graphics.clear();
    }
}
