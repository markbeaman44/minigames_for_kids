// @ts-ignore
import Phaser from "https://cdn.jsdelivr.net/npm/phaser@3.85.2/dist/phaser.esm.js";
declare const Phaser: typeof import("phaser");

import drawing from './scenes/drawLevel';
import Grid from "./scenes/gridLevel";
import mainMenu from './scenes/mainMenu';

const backgroundColour = "#224";

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE, // Adjusts canvas when the window resizes
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width:  window.innerWidth,
        height: window.innerHeight,
    },
    backgroundColor: backgroundColour,
    scene: [
        mainMenu, drawing, Grid
    ]
};

const game = new Phaser.Game(config);
