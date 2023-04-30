/**
 * Marlene Inoue
 * 
 * TITLE
 * 
 * TIME
 * 
 * Mods:
 *  - Track a high score that persists across scenes and display it in the UI [5]
 *  - Display the time remaining (in seconds) on the screen [10]
 *  - Implement the speed increase that happens after 30 seconds in the original game [5]
 *  - Implement the 'FIRE' UI text from the original game [5]
 *  - Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points [15]
 *  - Randomize each spaceship's movement direction at the start of each play [5]
 *  - Add your own (copyright-free) background music to the Play scene [5]
 *      - Source: https://soundcloud.com/raineypark/free-vlog-music-8bit-love-downtempo-lofi-nocopyright-music?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
 * 
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