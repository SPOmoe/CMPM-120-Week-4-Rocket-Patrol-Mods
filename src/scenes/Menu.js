class Menu extends Phaser.Scene {
  constructor() {
    super('menuScene');
  }

  preload() {
    // load audio
    this.load.audio('sfx_select', './assets/blip_select12.wav');
    this.load.audio('sfx_explosion', './assets/explosion38.wav');
    this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
  }

  create() {
    let menuConfig = {
          fontFamily: 'Monospace',
          fontSize: '32px',
          align: 'left',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 0
    }

    // show menu text
    let title = this.add.text(game.config.width / 2, game.config.height / 2 - ((borderUISize - borderPadding) * 8), 'ROCKET PATROL', menuConfig).setOrigin(0.5);
    title.setTintFill(0xCC3372, 0xCC3372, 0x33CC8D, 0x33CC8D);

    menuConfig.color = '#0da6f2';
    menuConfig.fontSize = '28px';
    
    this.add.text(game.config.width / 2, game.config.height / 2, 'Controls:\n\
    <- to move left\n\
    -> to move right\n\
    f to fire', menuConfig).setOrigin(0.5);

    this.add.text(game.config.width / 2, game.config.height / 2 + ((borderUISize - borderPadding) * 8), 'Press <- for Novice, -> for Expert', menuConfig).setOrigin(0.5);

    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        smallSpaceshipSpeed: 6,
        gameTime: 60000
      }

      this.sound.play('sfx_select');
      this.scene.start('playScene');
    }

    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 4,
        smallSpaceshipSpeed: 8,
        gameTime: 45000
      }

      this.sound.play('sfx_select');
      this.scene.start('playScene');
    }
  }
}