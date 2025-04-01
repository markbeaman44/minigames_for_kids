import baseUI from './baseUI';

export default class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });
        this.resizeGame = this.resizeGame.bind(this);
    }
    private baseUI!: baseUI;
    private containerGroup!: Phaser.GameObjects.Container;
    private fontSize: string = '24px';
    private background!: Phaser.GameObjects.Image;

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
        this.baseUI = new baseUI(this, this.fontSize)
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
            this.scene.start(`extra`);
        });

        this.containerGroup = this.add.container(this.scale.width / 2, this.scale.height / 2,
            [title, levelOne, levelTwo, extra]
        )

        this.resizeGame(this.scale.gameSize);
        this.scale.on("resize", this.resizeGame, this);
    }

    resizeGame(gameSize: Phaser.Structs.Size) {
        let { width, height } = gameSize;

        // Background
        let scaleX = width / this.background.width;
        let scaleY = height / this.background.height;
        this.background.setScale(scaleX, scaleY);
        this.background.setPosition(width / 2, height / 2);

        let scaleFactor = width < 800 ? 0.9 : 1;
        this.containerGroup.setScale(scaleFactor);
      
        // Reposition Images within Group
        this.containerGroup.setPosition(width / 2, height / 2);
      }
}
