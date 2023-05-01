class SmallSpaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing scene

        this.points = pointValue; // store pointValue
        this.moveSpeed = game.settings.smallSpaceshipSpeed; //pixels per frame
    }

    update() {
        //move spaceship left
        this.x -= this.moveSpeed;

        // wrap around from left edge to right edge
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.y = Phaser.Math.Between(borderUISize * 4, borderUISize * 6 + borderPadding * 4);
        this.x = game.config.width;
    }
}