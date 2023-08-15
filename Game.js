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
        //this.add.image(400, 712, "fondo");
        const randomColor = Phaser.Display.Color.RandomRGB();
        this.cameras.main.setBackgroundColor(randomColor);

        this.bar = this.physics.add
            .sprite(400, 550, "bar")
            .setScale(0.2)
            .setCollideWorldBounds(true)
            ;

        this.barGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        });

        this.limiteIzquierdo = 30;
        this.limiteDerecho = 770;
        this.limiteSuperior = 10;
        this.limiteInferior = 990;

        this.barGroup.add(this.bar);

        this.load = true;
        this.hit = 0;
        this.level = 1;

        this.randomAngle = Phaser.Math.RND.between(150, 30);
        this.velocityXBall = Math.cos(Phaser.Math.DegToRad(this.randomAngle));
        this.velocityYBall = Math.sin(Phaser.Math.DegToRad(this.randomAngle));

        this.cursors = this.input.keyboard.createCursorKeys();

        this.randomX = Phaser.Math.RND.between(100, 700);
        this.randomY = Phaser.Math.RND.between(100, 500);
        this.randomScale = Phaser.Math.RND.between(0.2, 0.4);

        this.obstacleGroup = this.physics.add.group({
        });
        
        this.obstacleGroup.add(this.obstacle);


        this.ball = this.physics.add
            .sprite(400, 300, "ball")
            .setScale(0.1)
            .setCircle(110, 0, 0)
            .setCollideWorldBounds(true)
            .setBounce(1)
            .setVelocity(this.velocityBall, this.velocityBall)
            ;
        this.ball.setCollideWorldBounds(true);

        this.ballGroup = this.physics.add.group({
            //allowGravity: false,
        });

        this.ballGroup.add(this.ball);

        this.physics.add.overlap(
            this.ball,
            this.bar,
            this.rebote,
            null,
            this
        );
        this.physics.add.collider(this.ball, this.obstacleGroup);
        


        this.hitText = this.add.text(80, 12, "Puntos: " + this.hit, {
            fontSize: "20px",
            fontStyle: "bold",
            frontFamily: "Console",
            fill: "#000000",
        });
        this.levelText = this.add.text(80, 37, "Nivel: " + this.level, {
            fontSize: "20px",
            fontStyle: "bold",
            frontFamily: "Console",
            fill: "#000000",
        });
       
    }


    update() {
        //moverse izquierda
        if (this.cursors.left.isDown) {
            this.bar.setVelocityX(-500);
        }
        //moveese derecha
        else if (this.cursors.right.isDown) {
            this.bar.setVelocityX(500);
        } else {
            this.bar.setVelocity(0);
        }

        if (this.ball.x < this.limiteIzquierdo) {
            this.ball.x = this.limiteIzquierdo;
            this.ball.setVelocityX(250)          

        } else if (this.ball.x > this.limiteDerecho) {
            this.ball.x = this.limiteDerecho;
            this.ball.setVelocityX(-250)
        }

        if (this.ball.y < this.limiteSuperior) {
            this.ball.y = this.limiteSuperior;
            this.ball.setVelocityY(250)
        } else if (this.ball.y > this.limiteInferior) {
            this.reset()
        }

        if (this.bar.x < this.limiteIzquierdo) {
            this.bar.x = this.limiteIzquierdo;
        } else if (this.bar.x > this.limiteDerecho) {
            this.bar.x = this.limiteDerecho;
        }

        if (this.ball.x >= 400) {
            this.reset();
        }

        if (this.level === 20) {
            this.reset()
        }

        if (this.hit === 10) {
            this.cameras.main.setBackgroundColor('#ffffff');
        }
    }

    addObstacle() {
        this.obstacle = this.physics.add
            .sprite(this.randomX = Phaser.Math.RND.between(100, 700), this.randomY = Phaser.Math.RND.between(100, 500), "obstacle1")
            .setScale(0.1)
            .setImmovable()
            .setVisible(true)
            .body.allowGravity = false;

    }
//this.randomX = Phaser.Math.RND.between(100, 700);
//this.randomY = Phaser.Math.RND.between(100, 500);
    rebote() {
        this.ball
            .setVelocityY(-250)
            .setVelocityX(-250)
            ;
        if (this.load === true) {
            this.hit++
            console.log(this.hit)
            this.hitText.setText("Puntos: " + this.hit);
            this.passLevel();
            this.load = false;
            this.randomAngle = Phaser.Math.RND.between(170, 10);
            this.ball.body.velocity.x = this.velocityXBall * -250;
            this.ball.body.velocity.y = this.velocityYBall * -250;
            setTimeout(() => {//coltdown
                this.load = true;
            }, 1000);
           
        }

    }


    passLevel() {
        if (this.hit === 10) {
            this.level++;
            this.levelText.setText("Nivel: " + this.level);

            this.velocityBall = this.velocityBall * 1.1;

            this.bar.setPosition(400, 550);
            this.ball.setPosition(400, 300)
                .setVelocity(this.velocityBall, this.velocityBall);
            this.hit = 0;
            this.hitText.setText("Puntos: " + this.hit);

            this.addObstacle()

            const randomColor = Phaser.Display.Color.RandomRGB();
            this.cameras.main.setBackgroundColor(randomColor);

        }
    }

      reset(){
/*if (this.level >= 1) {
    //this.obstacle.destroy();
    this.level = 1;
        this.levelText.setText("Nivel: " + this.level);
        this.bar.setPosition(400, 550);
}
            this.ball.setPosition(400, 300)
                .setVelocity(this.velocityBall, this.velocityBall);
            this.hit = 0;
            this.hitText.setText("Puntos: " + this.hit);

        */
    }  

}