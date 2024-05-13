img = "";
noseX = 0;
noseY = 0;
marioX = 325;
marioY = 325;
gameStatus = "";

function preload()
{
	world_start = loadSound("world_start.wav");
	setSprites();
	MarioAnimation();
}

function setup()
{
	canvas = createCanvas(1240, 336);
	video = createCapture(VIDEO);
	video.size(800, 400);
	video.parent('game_console');
	canvas.parent('canvas');
	
	instializeInSetup(mario);
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
	console.log("Model Loaded!")
}

function draw()
{
	fill(255, 255, 255);
	textSize(40);
	textAlign(CENTER);
	text("Press Play Button To Start The Game"), gameConfig.screenX/2, gameConfig.screenX/1;
	textSize(40);

	game()
	if(noseX < 300)
	{
		marioX = marioX - 1;
	}
	if(noseX > 300)
	{
		marioX = marioX + 1;
	}
	if(noseY < 150);
	{
		marioY = marioY - 1;
	}
}

function gotPoses(results)
{	
	if(results.length > 0)
	{
		console.log(results);
		noseX = results[0].pose.nose.x;
		noseY = results[0].pose.nose.y;
		console.log("noseX = " + noseX + "noseY = " + noseY);
	}
}

function game()
{
	console.log("noseX = " + noseX + "noseY = " + noseY);
	initalizeInDraw();
	moveEnvironment(mario);
	drawSprites();
}

function startGame()
{
	gameStatus = "start";
	document.getElementById("status").innerHTML = "Game Is Loading";
}

function changeGameStatus(character)
{
	if(GameStatus=="start"&& noseX !="" && gameConfig.status==="start")
	{
		world_start.play();
	}
}

function manualControl(character)
{
	if(character.live)
	{
		if(keyDown(noseX < 300))
		{
			character.velocity.x-=gameConfig.moveSpeed;
			character.changeAnimation('move');
			character.mirrorX(-1);
		}
		if(keyDown(noseX > 300))
		{
			character.velocity.x-=gameConfig.moveSpeed;
			character.changeAnimation('move');
			character.mirrorX(1);
		}
		if(!keyDown(control.left)&&!keyDown(control.right)&&!keyDown(control.up))
		{
			character.changeAnimation('stand');
		}
	}
}

function jumping(character)
{
	if((noseY < 200 && character.live)|| (touchIsDown&&character.live))
	{
		character.velocity.y+=gameConfig.jump;
	} 
}