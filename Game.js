export default class Game extends Phaser.Scene {

    constructor() {
        // key of the scene
        // the key will be used to start the scene by other scenes
        super("Game");
    }

    preload() {
        this.load.image("fondo", "/assets/images/fondo.jpg");
        this.load.image("ball", "/assets/images/ball.png");
        this.load.image("bar", "/assets/images/bar.png");
        this.load.image("obstacle1", "/assets/images/obstacle1.png");

    }

    init() {
    }

    create() {
        this.add.image(400, 712, "fondo");

        this.bar = this.physics.add
            .sprite(400, 550, "bar")
            .setScale(0.2)
            .setCollideWorldBounds(true)
            ;

        this.barGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        });

        this.barGroup.add(this.bar);
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.hit = 0
        this.level = 1
        this.velocityBall = 180
        this.cursors = this.input.keyboard.createCursorKeys();
        this.randomX = Phaser.Math.RND.between(100, 700);
        this.randomY = Phaser.Math.RND.between(100, 500);
        this.randomScaleX = Phaser.Math.RND.between(0.1, 0.3);


        this.ball = this.physics.add
            .sprite(400, 300, "ball")
            .setScale(0.1)
            .setCircle(110, 0, 0)
            .setCollideWorldBounds(true)
            .setBounce(1)
            .setVelocity(this.velocityBall, this.velocityBall)
            ;

        this.ballGroup = this.physics.add.group({
            //allowGravity: false,
        });

        this.ballGroup.add(this.ball);


        this.physics.add.overlap(
            this.ball,
            this.barGroup,
            this.rebote,
            null,
            this
        );
        //this.physics.add.collider(this.ball, this.asteroidGroup);



        this.hitText = this.add.text(80, 12, "Puntos: " + this.hit, {
            fontSize: "20px",
            fontStyle: "bold",
            frontFamily: "Console",
            fill: "#000000",
        });
        this.levelText = this.add.text(80, 57, "Nivel: " + this.level, {
            fontSize: "20px",
            fontStyle: "bold",
            frontFamily: "Console",
            fill: "#000000",
        });

    }


    update() {
        //moverse izquierda
        if (this.cursors.left.isDown) {
            this.bar.setVelocityX(-250);
        }
        //moveese derecha
        else if (this.cursors.right.isDown) {
            this.bar.setVelocityX(250);
        } else {
            this.bar.setVelocity(0);
        }
    }

    addObstacle() {
        this.obstacle = this.physics.add
            .sprite(this.randomX, this.randomY, "obstacle1")
            .setScaleX(this.randomScaleX);
    }

    rebote() {
        this.ball
            .setVelocityY(-250)
            .setVelocityX(-250)
            ;

        this.hit++
        console.log(this.hit)
        this.hitText.setText("Puntos: " + this.hit);
    }


    passLvel() {
        this.level++;
        this.levelText.setText("Nivel: " + this.level);

        this.velocityBall = this.velocityBall * 1.1;

        this.bar.setPosition(400, 550);
        this.ball.setPosition(400, 300)
            .setVelocity(this.velocityBall, this.velocityBall);
        this.hit = 0;
        this.hitText.setText("Puntos: " + this.hit);

        this.addObstacle()

    }


}