import baseUI from './baseUI';
import animationUI from './animationUI';
import * as helpers from './helper';

export default class Drawing extends Phaser.Scene {
    constructor() {
        super({ key: 'level3' });
    }

    private baseUI!: baseUI;
    private background!: Phaser.GameObjects.Image;
    private gridBorder!: Phaser.GameObjects.Rectangle;
    private containerGroup!: Phaser.GameObjects.Container;
    private animals = helpers.animals;
    private objects = helpers.objects;
    private everydayObjects = helpers.everydayObjects;
    private food = helpers.food;
    private sports = helpers.sports;
    private allObjects = [
        {
            name: 'Animals',
            emojis: this.animals
        },
        {
            name: 'Assets',
            emojis: this.objects
        },
        {
            name: 'Items',
            emojis: this.everydayObjects
        },
        {
            name: 'Food',
            emojis: this.food
        },
        {
            name: 'Sports',
            emojis: this.sports
        }
    ];
    private currentObject = '';
    private balloonGroup;
    private pickedObjects;
    private targetText;
    private targetSentence;
    private scoreText;
    private totalBalloons = 2;
    private score = 0;
    private timerEvent!: Phaser.Time.TimerEvent;
    private timerText!: Phaser.GameObjects.Text;
    private timeLeft: number = 60;

    preload() {
        this.load.image('home', 'assets/homeButton.png');
        this.load.image('backgroundBalloon', 'assets/levelThree.png');
        this.input.setDefaultCursor('default')
    }

    create() {
        this.baseUI = new baseUI(this, "18px");

        this.balloonGroup = this.add.group();
        this.pickedObjects = this.allObjects[Phaser.Math.Between(0, this.allObjects.length - 1)];

        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'backgroundBalloon')
            .disableInteractive();
    
        this.targetText = this.add.text(-200, -500, '', {
            fontSize: '164px',
            padding: { x: 15, y: 15 }
        }).setOrigin(0.5).setDepth(1);

        this.targetSentence = this.add.text(this.targetText.x + 30, this.targetText.y, `Find:            in ${this.pickedObjects.name}`, {
            fontSize: '32px',
            color: '#000',
        }).setOrigin(0.5);

        this.scoreText = this.add.text(this.targetText.x + 382, this.targetText.y - 20, `Score: ${this.score}`, {
            fontSize: '32px',
            color: '#000',
        }).setOrigin(0.5);

        this.timerText = this.add.text(this.targetText.x + 382, this.targetText.y + 30, `Time: ${this.timeLeft}`, {
            fontSize: '32px',
            color: '#000',
        }).setOrigin(0.5);

        let homeButton = this.baseUI.addInteractiveImage(this.targetText.x + 550, this.targetText.y, 'home', 0.3, () => { 
            this.scene.start(`mainMenu`);
            this.score = 0;
            this.totalBalloons = 2;
        });

        this.containerGroup = this.add.container(this.scale.width / 2, this.scale.height / 2,
            [ this.targetText, this.targetSentence, this.scoreText, this.timerText, homeButton ]);

        this.startRound();
        this.startTimer();

        this.input.on('pointerdown', (pointer) => {
            // Iterate in reverse to check topmost object first
            const balloons = [...this.balloonGroup.getChildren()].reverse();
            for (let balloon of balloons) {
                const bounds = (balloon as Phaser.GameObjects.Container).getBounds();
                if (Phaser.Geom.Rectangle.Contains(bounds, pointer.x, pointer.y)) {
                    const objectClicked = balloon.getData('object');
                    console.log(`Clicked: ${objectClicked}`);
                    console.log(`Current: ${this.currentObject}`);
    
                    if (objectClicked === this.currentObject) {
                        this.score++;
                        this.totalBalloons++;
                        if (this.score > 10) {
                            this.totalBalloons = 2;
                            this.score = 0;
                            this.pickedObjects = this.allObjects[Phaser.Math.Between(0, this.allObjects.length - 1)];
                            this.startTimer();
                        }
                    } else {
                        this.score = 0;
                        this.totalBalloons = 2;
                    }
                    this.updateScoreText();
                    this.balloonGroup.clear(true, true);
                    this.startRound();
                    break;
                }
            }
        }); 

        this.resizeGame(this.scale.gameSize);
        this.scale.on("resize", this.resizeGame, this);
    }

    startRound() {
        const balloonWidth = 110;
        const balloonHeight = 180;
        const screenWidth = this.scale.width;
        const spacing = screenWidth / this.totalBalloons;

        this.physics.add.collider(this.balloonGroup, this.balloonGroup);
        this.physics.world.setBounds(0, 100, this.scale.width, this.scale.height - 200);

        let objectList: string[] = [];
        const availableObjects = Phaser.Utils.Array.Shuffle(this.pickedObjects.emojis.slice());

        for (let i = 0; i < this.totalBalloons; i++) {
            const baseX = spacing * i + spacing / 2;
            const calcWidthSize = this.scale.width < 600 ? 200 : 800;
            const x = Phaser.Math.Clamp(baseX + Phaser.Math.Between(-20, 20), balloonWidth / 2, screenWidth - balloonWidth / 2) - calcWidthSize;
            const y = Phaser.Math.Between(100, 200) - 600; 
            const objectPicked: any = availableObjects.pop()!;
            objectList.push(objectPicked);
            const balloonEmoji = this.add.text(0, 0, '🎈', {
                fontSize: '180px',
                padding: { top: 30, bottom: 30 }
            });
            const animalLabel = this.add.text(70, 80, objectPicked, {
                fontSize: '90px',
                padding: { top: 30, bottom: 30 }
            })
                .setOrigin(0.5, 0.5)
                .setFontFamily('Arial')
                .setPosition(balloonWidth / 2 + 20, balloonHeight / 2 - 10);
            
            // Create container with both
            const balloon = this.add.container(x, y, [balloonEmoji, animalLabel]).setSize(balloonWidth, balloonHeight);
            this.physics.add.existing(balloon);
            
            const bBody = balloon.body as Phaser.Physics.Arcade.Body;
            bBody.setVelocityY(Phaser.Math.Between(20, 100));
            bBody.setVelocityX(Phaser.Math.Between(-50, 50));
            bBody.setBounce(1);
            bBody.setCollideWorldBounds(true);
            
            balloon.setInteractive(new Phaser.Geom.Rectangle(0, 0, balloonWidth, balloonHeight), Phaser.Geom.Rectangle.Contains);
            balloon.setData('object', objectPicked);
            
            // Add to group
            this.balloonGroup.add(balloon);
            this.containerGroup.add(balloon);
        }

        this.currentObject = Phaser.Utils.Array.GetRandom(objectList);
        this.targetText.setText(this.currentObject);
    }

    updateScoreText() {
        this.scoreText.setText(`Score: ${this.score}`);
    }

    startTimer() {
        if (this.timerEvent) this.timerEvent.remove(false); // clear previous
    
        this.timeLeft = 60;
        this.timerText.setText(`Time: ${this.timeLeft}`);
    
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.timeLeft--;
                this.timerText.setText(`Time: ${this.timeLeft}`);
    
                if (this.timeLeft <= 0) {
                    this.timerEvent.remove(false);
                    this.resetGame();
                }
            }
        });
    }

    resetGame() {
        this.score = 0;
        this.totalBalloons = 2;
        this.updateScoreText();
        this.balloonGroup.clear(true, true);
        this.startTimer();
        this.startRound();
    }

    resizeGame(gameSize: Phaser.Structs.Size) {
            let { width, height } = gameSize;
    
            // Background
            let scaleX = width / this.background.width;
            let scaleY = height / this.background.height;
            this.background.setScale(scaleX, scaleY);
            this.background.setPosition(width / 2, height / 2);
    
            let {scaleFactorX, scaleFactorY} = helpers.getScreenSize(width, height);
            
            this.containerGroup.setScale(scaleFactorX, scaleFactorY);
            this.containerGroup.setPosition(width / 2, height / 2);
        }
}
