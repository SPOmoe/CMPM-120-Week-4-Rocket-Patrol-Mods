// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing, displayList, updateList
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        this.isFiring = false; // track rocket's firing status
        this.moveSpeed = 2; // pixels per frame
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
          if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
          } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
          }
        // control rocket when firing
        } else {
            // spin rocket and move rocket to the left
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                  this.rotation += 30;
                  this.x -= this.moveSpeed;
            // spin rocket and move rocket to the right
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                  this.rotation += 30;
                  this.x += this.moveSpeed;
            // turn rocket back to angle 0 when no key is pressed
            } else if (!keyLEFT.isDown && !keyRIGHT.isDown) {
                if (this.angle < 0)
                  this.angle += 1;
                else if (this.angle > 0)
                  this.angle -= 1;
            }

            // bound movement on right wall
            if (this.x > game.config.width - borderUISize - this.width)
              this.x = game.config.width - borderUISize - this.width;

             // bound movement on left wall
            if (this.x < borderUISize + this.width)
              this.x = borderUISize + this.width;
        }

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); // play sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

        // reset rocket to "ground"
        reset() {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
            this.angle = 0;
        }
}