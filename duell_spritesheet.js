// create a Pixi application
let app = new PIXI.Application({
    width: 1900,
    height: 1000,
    transparent: true
});

// add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let leftPlayer, rightPlayer, background, spritesheetname, middle, state;

spritesheetname = "images/spritesheet.json";

// load sprite sheet image + data file, call setup() if completed
PIXI.loader
    .add("images/sprites/background.png")
    .add(spritesheetname)
    .load(setup);


function setup() {
    // the sprite sheet we've just loaded:
    let sheet = PIXI.loader.resources[spritesheetname].spritesheet;
    let resources = PIXI.loader.resources;
    // initialize background sprite

    background = new PIXI.Sprite(resources["images/sprites/background.png"].texture);


    // scale stage container that it fits into the view
    app.stage.scale.x = app.view.width / background.width;
    app.stage.scale.y = app.view.height / background.height;

    // create an animated sprite
    leftPlayerAttack = new PIXI.AnimatedSprite(sheet.animations["ninjaboy/Attack_"]);
    leftPlayerRun = new PIXI.AnimatedSprite(sheet.animations["ninjaboy/Run_"]);
    leftPlayerDie = new PIXI.AnimatedSprite(sheet.animations["ninjaboy/Dead_"]);
    leftPlayerWin = new PIXI.AnimatedSprite(sheet.animations["ninjaboy/Idle_"]);
    rightPlayerAttack = new PIXI.AnimatedSprite(sheet.animations["ninjagirl/Attack_"]);
    rightPlayerRun = new PIXI.AnimatedSprite(sheet.animations["ninjagirl/Run_"]);
    rightPlayerDie = new PIXI.AnimatedSprite(sheet.animations["ninjagirl/Dead_"]);
    rightPlayerWin = new PIXI.AnimatedSprite(sheet.animations["ninjagirl/Idle_"]);

    // configure animations:

    // Left Player
    leftPlayerRun.play();
    leftPlayerAttack.play();

    leftPlayerAttack.visible = false;
    leftPlayerDie.visible = false;
    leftPlayerWin.visible = false;

    leftPlayerDie.loop = false;
	leftPlayerRun.animationSpeed = 0.167;
	leftPlayerAttack.animationSpeed = 0.167;
	leftPlayerDie.animationSpeed = 0.16;
	leftPlayerWin.animationSpeed = 0.167;
	
	leftPlayer = new PIXI.Container();
	leftPlayer.addChild(leftPlayerAttack);
    leftPlayer.addChild(leftPlayerRun);
    leftPlayer.addChild(leftPlayerDie);
    leftPlayer.addChild(leftPlayerWin);
	
	leftPlayer.scale.set(0.5);
	leftPlayer.position.set(-200, background.height - 550);

    // Right Player
	rightPlayerRun.play();
    rightPlayerAttack.play();	
    rightPlayerAttack.visible = false;
    rightPlayerDie.visible = false;
    rightPlayerWin.visible = false;
    rightPlayerDie.loop = false;
	rightPlayerRun.animationSpeed = 0.167;
	rightPlayerAttack.animationSpeed = 0.167;
	rightPlayerDie.animationSpeed = 0.16;
	rightPlayerWin.animationSpeed = 0.167;
	
	rightPlayer = new PIXI.Container();
	rightPlayer.addChild(rightPlayerAttack);
    rightPlayer.addChild(rightPlayerRun);
    rightPlayer.addChild(rightPlayerDie);
    rightPlayer.addChild(rightPlayerWin);
	rightPlayer.scale.set(0.5);
	rightPlayer.scale.x *= -1;
	
	rightPlayer.position.set(background.width + 200, background.height - 550);

    // configure + start animation:

middle = (app.view.width / 2) - 170;

    // Enable this to update the anchor points with each animation frame
    // leftPlayer.updateAnchor = true;

    // add it to the stage and render!

      app.stage.addChild(background);
    app.stage.addChild(leftPlayer);  
    app.stage.addChild(rightPlayer);
    app.ticker.add(delta => gameLoop(delta));


}
var n = 0;
var winner = Math.floor(Math.random() * Math.floor(2));

function gameLoop(delta) {
 console.log(middle);

    if (leftPlayer.x < middle && n == 0) {
        leftPlayer.x = (leftPlayer.x + 5 * delta) % (background.width + 200);
        rightPlayer.x = (rightPlayer.x - 5 * delta) % (background.width + 200);
    } else {
        n++;
        leftPlayerRun.stop();
        leftPlayerAttack.visible = true;
        leftPlayerRun.visible = false;
        rightPlayerRun.stop();
        rightPlayerAttack.visible = true;
        rightPlayerRun.visible = false;
    }
    if (n > 180) {

        switch (winner) {
            case 0:
                leftPlayerAttack.stop();
                leftPlayerWin.visible = true;
                leftPlayerAttack.visible = false;
                leftPlayerWin.play();
                rightPlayerAttack.stop();
                rightPlayerDie.visible = true;
                rightPlayerAttack.visible = false;
                rightPlayerDie.play();
                break;
            case 1:
                leftPlayerAttack.stop();
                leftPlayerDie.visible = true;
                leftPlayerAttack.visible = false;
                leftPlayerDie.play();
                rightPlayerAttack.stop();
                rightPlayerWin.visible = true;
                rightPlayerAttack.visible = false;
                rightPlayerWin.play();
                break;

        }



    }

}

function hurz(delta) {
	leftPlayerRun.play();
    leftPlayerAttack.play();
	  leftPlayerRun.visible = true;
    leftPlayerDie.visible = false;
    leftPlayerWin.visible = false;
	leftPlayer.position.set(-200, background.height - 550);
	
	rightPlayerRun.play();
    rightPlayerAttack.play();
	 rightPlayerRun.visible = true;
    rightPlayerDie.visible = false;
    rightPlayerWin.visible = false;
	rightPlayer.position.set(background.width + 200, background.height - 550);
	n = 0;
	winner = Math.floor(Math.random() * Math.floor(2));
}