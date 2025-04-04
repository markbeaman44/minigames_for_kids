import baseUI from "./baseUI.js";
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
        let title = this.add.text(-100, -300, 'Select Level', { fontSize: '32px', color: '#000000' });
        let levelOne = this.baseUI.addInteractiveImage(-150, -100, 'levelOne', 0.7, () => {
            this.scene.start(`level1`);
        });
        let levelTwo = this.baseUI.addInteractiveImage(150, -100, 'levelTwo', 0.7, () => {
            this.scene.start(`level2`);
        });
        let extra = this.baseUI.addInteractiveImage(0, 100, 'extra', 0.6, () => {
            this.scene.start(`levelExtra`);
        });
        this.containerGroup = this.add.container(this.scale.width / 2, this.scale.height / 2, [title, levelOne, levelTwo, extra]);
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
        let scaleFactorX = width < 500 ? 0.45 : width < 600 ? 0.5 : width < 800 ? 0.6 : width < 1000 ? 0.7 : width < 1200 ? 0.8 : 1;
        let scaleFactorY = height < 500 ? 0.45 : height < 600 ? 0.5 : height < 800 ? 0.6 : height < 1000 ? 0.7 : height < 1200 ? 0.8 : 1;
        this.containerGroup.setScale(scaleFactorX, scaleFactorY);
        // Reposition Images within Group
        this.containerGroup.setPosition(width / 2, height / 2);
    }
}
