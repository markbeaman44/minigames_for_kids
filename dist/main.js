import drawing from "./scenes/drawLevel.js";
import Grid from "./scenes/gridLevel.js";
import Balloon from "./scenes/balloonLevel.js";
import Extra from "./scenes/extraLevel.js";
import mainMenu from "./scenes/mainMenu.js";
const backgroundColour = "#f5c08e";
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    backgroundColor: backgroundColour,
    physics: { default: 'arcade' },
    scene: [
        mainMenu, drawing, Grid, Balloon, Extra
    ]
};
const game = new Phaser.Game(config);
