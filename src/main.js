/**
 * Marlene Inoue
 * 
 * Title: Rocket Patrol Adventure
 * 
 * Time: ~13 hours
 * 
 * Mods:
 *  - Track a high score that persists across scenes and display it in the UI [5]
 *  - Display the time remaining (in seconds) on the screen [10]
 *  - Implement the speed increase that happens after 30 seconds in the original game [5]
 *  - Implement the 'FIRE' UI text from the original game [5]
 *  - Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points [15]
 *  - Add your own (copyright-free) background music to the Play scene [5]
 *      - Source: https://soundcloud.com/raineypark/free-vlog-music-8bit-love-downtempo-lofi-nocopyright-music?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
 *  - Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship [15]
 *  - Create a new scrolling tile sprite for the background [5]
 *  - Create a new title screen (e.g., new artwork, typography, layout) [10]
 *      - Title Source: source: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/display/tint/text%20tint.js
 *  - Implement a new timing/scoring mechanism that adds time to the clock for successful hits [15]
 *  - Allow the player to control the Rocket after it's fired [5]
 * 
 *  Create Your Own Mods:
 *  - Rocket spins when the player is controlling it [5] - Professor Nathan
 */

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let keyF, keyR, keyLEFT, keyRIGHT;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let highScore = 0;