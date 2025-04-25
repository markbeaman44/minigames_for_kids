import baseUI from "./baseUI.js";
import * as helpers from "./helper.js";
export default class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });
        this.fontSize = '24px';
        this.resizeGame = this.resizeGame.bind(this);
    }
    preload() {
        this.load.image('background', 'assets/menu.png');
        this.load.image('levelOne', 'assets/paintButton.png');
        this.load.image('levelTwo', 'assets/gridButton.png');
        this.load.image('levelThree', 'assets/balloonButton.png');
        this.load.image('extra', 'assets/extraButton.png');
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.overflow = "hidden";
    }
    create() {
        // Initialize classes
        this.baseUI = new baseUI(this, this.fontSize);
        this.input.setDefaultCursor('default');
        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background')
            .disableInteractive();
        let title = this.add.text(-150, -300, 'Select Mini Game', { fontSize: '32px', color: '#000000' });
        let levelOne = this.baseUI.addInteractiveImage(-150, -100, 'levelOne', 0.7, () => {
            this.scene.start(`level1`);
        });
        let levelTwo = this.baseUI.addInteractiveImage(150, -100, 'levelTwo', 0.7, () => {
            this.scene.start(`level2`);
        });
        let levelThree = this.baseUI.addInteractiveImage(-150, 150, 'levelThree', 0.7, () => {
            this.scene.start(`level3`);
        });
        let extra = this.baseUI.addInteractiveImage(150, 150, 'extra', 0.6, () => {
            this.scene.start(`levelExtra`);
        });
        this.containerGroup = this.add.container(this.scale.width / 2, this.scale.height / 2, [title, levelOne, levelTwo, levelThree, extra]);
        this.resizeGame(this.scale.gameSize);
        this.scale.on("resize", this.resizeGame, this);
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
        // Reposition Images within Group
        this.containerGroup.setPosition(width / 2, height / 2);
    }
}
