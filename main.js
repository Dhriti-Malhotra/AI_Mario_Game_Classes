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