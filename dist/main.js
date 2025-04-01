import drawing from "./scenes/drawLevel.js";
import Grid from "./scenes/gridLevel.js";
import mainMenu from "./scenes/mainMenu.js";
const backgroundColour = "#224";
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    backgroundColor: backgroundColour,
    scene: [
        mainMenu, drawing, Grid
    ]
};
const game = new Phaser.Game(config);
