import baseUI from './baseUI';

export default class Extra extends Phaser.Scene {
    constructor() {
        super({ key: 'levelExtra' });
    }

    private baseUI!: baseUI;
    private background!: Phaser.GameObjects.Image;
    private containerGroup!: Phaser.GameObjects.Container;

    preload() {
        this.load.image('home2', 'assets/extra/home.png');
        this.load.image('background3', 'assets/extra/backgroundExtra.png');
        this.load.image('alien_purple', 'assets/extra/alien_purple.png');
        this.load.image('floating_face', 'assets/extra/floating_face.png');
        this.load.image('person_ball', 'assets/extra/person_ball.png');
        this.load.image('person_black', 'assets/extra/person_black.png');
        this.load.image('person_blue', 'assets/extra/person_blue.png');
        this.load.image('person_brown', 'assets/extra/person_brown.png');
        this.load.image('person_fred', 'assets/extra/person_fred.png');

        this.load.image('person_grey', 'assets/extra/person_grey.png');
        this.load.image('person_loads', 'assets/extra/person_loads.png');
        this.load.image('person_purple', 'assets/extra/person_purple.png');
        this.load.image('rabbit_purple', 'assets/extra/rabbit_purple.png');

        this.load.image('boy', 'assets/extra/boy.png');
   
        this.input.setDefaultCursor('default')
    }

    create() {
        // Initialize classes
        this.baseUI = new baseUI(this, "18px");
 
        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background3')
            .disableInteractive();

        let homeButton = this.baseUI.addInteractiveImage(400, 150, 'home2', 0.3, () => { 
            this.scene.start(`mainMenu`);
        });

        let refreshText = this.add.text(-140, 460, 'Refresh', { fontSize: '24px', color: '#ffffff'})
            .setAlpha(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => refreshText.setColor('#ff5555'))
            .on('pointerout', () => refreshText.setColor('#ffffff'))
            .on('pointerdown', () => { this.scene.restart() });

        let boy = this.add.image(0, -300, 'boy').setScale(0.5);
        let alienPurple = this.add.image(80, 100, 'alien_purple').setScale(0.18);
        let personPurple = this.add.image(180, 100, 'person_purple').setScale(0.18);
        let floatingFace = this.add.image(-600, -300, 'floating_face').setScale(0.3);
        let personBall = this.add.image(-500, 300, 'person_ball').setScale(0.3);
        let personBlack = this.add.image(-420, 60, 'person_black').setScale(0.2);
        let personFred = this.add.image(290, 340, 'person_fred').setScale(0.3);
        let personGrey = this.add.image(680, 100, 'person_grey').setScale(0.15);
        let personLoads = this.add.image(520, -280, 'person_loads').setScale(0.3);
        let rabbitPurple = this.add.image(-150, 200, 'rabbit_purple').setScale(0.25);
        let personBrown = this.add.image(-260, -250, 'person_brown').setScale(0.2);
        let personBlue = this.add.image(50, -350, 'person_blue').setScale(0.1);

        this.containerGroup = this.add.container(this.scale.width / 2, this.scale.height / 2,
            [ boy, homeButton, alienPurple, floatingFace, personBall, personBlack,
                personFred, personGrey, personLoads,
                personPurple, rabbitPurple, personBlue, personBrown, refreshText ]);

        this.animateBounce(boy, 50, 5000);
        this.animateBounce(alienPurple, 250, 1000);
        this.animateBounce(personPurple, 300, 1200);
        this.animateBounce(rabbitPurple, 200, 3000);

        this.animateFlyAround(personBrown, 90);
        this.animateFlyAround(personBlue, 120);

        this.animateShake(floatingFace, 10, 2000);
        this.animateShake(personLoads, 10, 1000);
        this.animateWobble(personLoads, 10, 1000);

        this.animateExpand(personBall, 0.5, 1500);

        this.animateSpin(personGrey, 5000);

        this.animateWobble(personBlack, 10, 300);

        this.animateFlicker(personFred, 1000);

        this.resizeGame(this.scale.gameSize);
        this.scale.on("resize", this.resizeGame, this);
    }

    animateBounce(sprite, height = 200, duration = 500) {
        sprite.scene.tweens.add({
            targets: sprite,
            y: sprite.y - height,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            duration: duration
        });
    }

    animateShake(sprite, intensity = 5, duration = 200) {
        sprite.scene.tweens.add({
            targets: sprite,
            x: sprite.x + intensity,
            yoyo: true,
            repeat: -1,
            duration: duration
        });
    }

    animateFlyAround(sprite, angle = 180) {
        const xDirection = Phaser.Math.Between(0, 1) === 0 ? -500 : 500;
        const yDirection = Phaser.Math.Between(0, 1) === 0 ? -400 : 400;
        const eases = ['Sine.InOut', 'Linear', 'Cubic.Out'];
        const randomEase = Phaser.Utils.Array.GetRandom(eases);
        sprite.scene.tweens.add({
            targets: sprite,
            x: xDirection,
            y: yDirection, 
            angle: angle,
            duration: Phaser.Math.Between(500, 1500),
            yoyo: true, 
            ease: randomEase,
            repeat: -1,
        });
    }

    animateExpand(sprite,scale = 2, duration = 500) {
        sprite.scene.tweens.add({
            targets: sprite,
            scaleX: scale,
            scaleY: scale,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            duration: duration
        });
    }

    animateSpin(sprite, speed = 200) {
        sprite.scene.tweens.add({
            targets: sprite,
            angle: 360,
            repeat: -1,
            ease: 'Linear',
            duration: speed
        });
    }


    animateWobble(sprite, intensity = 10, duration = 300) {
        sprite.scene.tweens.add({
            targets: sprite,
            angle: intensity,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            duration: duration
        });
    }

    animateFlicker(sprite, duration = 100) {
        sprite.scene.tweens.add({
            targets: sprite,
            alpha: 0,
            yoyo: true,
            repeat: -1,
            duration: duration
        });
    }

    resizeGame(gameSize: Phaser.Structs.Size) {
        let { width, height } = gameSize;

        // Background
        let scaleX = width < 500 ? 0.45 : width < 600 ? 0.5 : width / this.background.width;
        let scaleY = height < 500 ? 0.45 : height < 600 ? 0.5 : height / this.background.height;
        this.background.setScale(scaleX, scaleY);
        this.background.setPosition(width / 2, height / 2);
        this.containerGroup.setScale(scaleX, scaleY);
        this.containerGroup.setPosition(width / 2, height / 2);
    }
}
