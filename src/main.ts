// @ts-ignore
import Phaser from "https://cdn.jsdelivr.net/npm/phaser@3.85.2/dist/phaser.esm.js";
declare const Phaser: typeof import("phaser");

import drawing from './scenes/drawLevel';
import Grid from "./scenes/gridLevel";
import Balloon from "./scenes/balloonLevel";
import Extra from "./scenes/extraLevel";
import mainMenu from './scenes/mainMenu';

const backgroundColour = "#f5c08e";

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE, // Adjusts canvas when the window resizes
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width:  window.innerWidth,
        height: window.innerHeight,
    },
    backgroundColor: backgroundColour,
    physics: { default: 'arcade' },
    scene: [
        mainMenu, drawing, Grid, Balloon, Extra
    ]
};

const game = new Phaser.Game(config);
