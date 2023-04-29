class Play extends Phaser.Scene {
  constructor() {
    super('playScene');
  }

  preload() {
    this.load.image('rocket', './assets/rocket.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('starfield', './assets/starfield.png');
    this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
  }
  
  create() {
    // place tile sprite
    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
    
    // green UI background
    this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0, 0);
    // top white border
    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xffffff).setOrigin(0, 0);
    // bottom white border
    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xffffff).setOrigin(0, 0);
    // left white border
    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0, 0);
    // right white border
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,  0xffffff).setOrigin(0, 0);

    // add rocket (p1)
    this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

    // add spaceships (x3)
    this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0,0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0);

    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
      frameRate: 30
    });

    // initialize score
    this.p1Score = 0;

    // display score
    let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '20px',
      backgroundColor: '#F3B141',
      color: '#843695',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    }

    // high score config
    let highScoreConfig = {
      fontFamily: 'Courier',
      fontSize: '20px',
      backgroundColor: '#F3B141',
      color: '#843695',
      align: 'left',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 160
    }

    // time score config
    let timeConfig = {
      fontFamily: 'Courier',
      fontSize: '20px',
      backgroundColor: '#F3B141',
      color: '#843695',
      align: 'left',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    }

    // fire score config
    let fireConfig = {
      fontFamily: 'Courier',
      fontSize: '20px',
      backgroundColor: '#F3B141',
      color: '#843695',
      align: 'left',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 50
    }

    // current score
    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2.5, this.p1Score, scoreConfig);

    // high score
    this.newHighScore = this.add.text((game.config.width / 2) + (game.config.width / 5) - borderPadding, borderUISize + borderPadding * 2.5, `Highscore:${highScore}`, highScoreConfig);

    // GAME OVER flag
    this.gameOver = false;

    // 60 second play clock
    scoreConfig.fixedWidth = 0;

    highScoreConfig.fixedWidth = 0;

    this.clock = this.time.delayedCall(60000, () => {
      this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
      this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
      this.gameOver = true;
    }, null, this);


    // countdown
    this.currTime = this.add.text(game.config.width / 2 - borderPadding, borderUISize + borderPadding * 2.5, `Time:${this.clock.getRemainingSeconds()}`, timeConfig);

    // FIRE text when rocket is flying
    this.FIRE = this.add.text(game.config.width / 3 - borderPadding, borderUISize + borderPadding * 2.5, ``, fireConfig);
  }

  update () {
    // check key input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.scene.restart();
    }

    if (!this.gameOver) {
      this.p1Rocket.update();
      this.starfield.tilePositionX -= 4;
      this.ship01.update();
      this.ship02.update();
      this.ship03.update();
    }

    if (this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship03);
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01);
    }

    // game over
    if (this.gameOver) {
      // update high score
      if (this.p1Score > highScore) {
        highScore = this.p1Score;

        this.newHighScore.setText(`Highscore:${highScore}`);
      }

      // go to menu screen
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.scene.start("menuScene");
      }

    }

    // show time remaining in seconds
    this.currTime.setText(`Time:${Math.ceil(this.clock.getRemainingSeconds())}`);

    // increase ship speed when the seconds reach 30
    if (Math.ceil(this.clock.getRemainingSeconds()) == 30) {
      this.increaseSpeed(this.ship03);
      this.increaseSpeed(this.ship02);
      this.increaseSpeed(this.ship01);
    }

    // display "FIRE" when rocket is flying
    if (this.p1Rocket.y != game.config.height - borderUISize - borderPadding) {
      this.FIRE.setStyle({backgroundColor: '#F3B141', color: '#843695'});
      this.FIRE.setText(`FIRE`);
    // otherwise "remove" the text
    } else {
      this.FIRE.setStyle({backgroundColor: '#00FF00', color: '#00FF00'});
      this.FIRE.setText(``);
    }

  }

  checkCollision(rocket, ship) {
    if (rocket.x < ship.x + ship.width &&
      rocket.x + rocket.width > ship.x &&
      rocket.y < ship.y + ship.height &&
      rocket.height + rocket.y > ship.y) {
      return true;
    } else {
      return false;
    }

  }

  shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;

    // create explosion sprite at ship's pos
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);

    // play explode animation
    boom.anims.play('explode');

    // callback after anim
    boom.on('animationcomplete', () => { // callback after anim completes
      ship.reset(); // reset ship position
      ship.alpha = 1; // make ship visible again
      boom.destroy(); // remove explosion sprite
    });

    // score add and repaint
    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score;

    this.sound.play('sfx_explosion');
  }

  // increases spaceship speed by 2x
  increaseSpeed(ship) {
    ship.moveSpeed = game.settings.spaceshipSpeed * 2;
  }
}