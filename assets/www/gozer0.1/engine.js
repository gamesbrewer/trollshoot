/*
   Copyright (c) 2010 Jonathan Ho
   http://www.gamesbrewer.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// default screen size at handphone panoramic view
var cMobilePixelWidth = 480; //screen width constant
var cMobilePixelHeight = 268; //screen height constant
var c640PixelWidth = 640; //screen width constant
var c640PixelHeight = 480; //screen height constant
var c800PixelWidth = 800; //screen width constant
var c800PixelHeight = 600; //screen height constant
var c1024PixelWidth = 1024; //screen width constant
var c1024PixelHeight = 768; //screen height constant

//drawing stuff
var hCanvas; //handle to canvas
var hDrawingContext; //handle to canvas drawing context
var hCanvasFill; //handle to canvas background
var backImage;
var frontImage;

//timer stuff
var CanvasTimerId = 1;
var fps = 1000; //1 frame per second

//a user defined collection type
function Engine()
{
    // members
    this.keyArray = new Array(); // Keys
        
    // methods
    this.Init = initEngine; //initialize the canvas
	this.SetSizeMobile = setCanvasSizeMobile; //set the canvas to mobile
	this.SetSize640 = setCanvasSize640; //set the canvas to 640 x 480
	this.SetSize800 = setCanvasSize800; //set the canvas to 800 x 600
	this.SetSize1024 = setCanvasSize1024; //set the canvas to 1024 x 768
	this.SetSize = setCanvasSize; //set the size of canvas
	this.SetState = setGameState; //set the game state
	this.GetState = getGameState; //get the game state
    this.Run = RunTimer; //run the engine
	this.Stop = stopTimer; //stop the engine
	this.Fill = fillBackground; //fill background color
	this.Background = setBackground; //set background images
	this.Front = setFront; //set front images
	this.addButton = ButtonAdd; //add button to canvas
	this.addActor = ActorAdd;
	this.SetFPS = updateFPS; //change frame per second
	this.HTTPSend = GetXHR; //XML HTTP Request stuff
}

function GetXHR(params) {
	var getRequest = new HTTPRequest();
	
	getRequest.onreadystatechange=function() {
		if (getRequest.readyState==4) {
			if (getRequest.status==200) {
				getXHRData(0, getRequest.responseText);
			}
			else {
				getXHRData(-1, getRequest.status);
			}
		}
	}

	getRequest.open("GET", document.location.href.replace(".html",".php"), true);
	getRequest.send(null);
}

function HTTPRequest() {
	var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"]; //activeX versions to check for in IE
	if (window.ActiveXObject) { //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
		for (var i=0; i<activexmodes.length; i++) {
			try {
				return new ActiveXObject(activexmodes[i]);
			}
			catch(e) {
				//suppress error
			}
		}
	}
	else if (window.XMLHttpRequest) { // if Mozilla, Safari etc
		return new XMLHttpRequest();
	}
	else {
		return false;
	}
}

function ButtonAdd(name, x, y, width, height, src, state) {
	newButton(name, x, y, width, height, src, state);
}

function ActorAdd(name, x, y, width, height, src, frame) {
	newActor(name, x, y, width, height, src, frame);
}

function updateFPS(newfps) {
	fps = 1000/newfps;
}

function initEngine() {
	initCanvas();
	initButton();
	initActor();
	initState();
	fillBackground("#ffffff");
}

function RunTimer() {
	CanvasTimerId = setInterval(draw, fps);
	draw();
}

function stopTimer() {
	clearInterval(CanvasTimerId);
}

function fillBackground(color) {
	hCanvasFill = color;
}

function setBackground(src) {
	backImage = new Image();
	backImage.src = src;
}

function setFront(src) {
	frontImage = new Image();
	frontImage.src = src;
}

function setCanvasSizeMobile() {
	setCanvasSize(cMobilePixelWidth, cMobilePixelHeight);
}

function setCanvasSize640() {
	setCanvasSize(c640PixelWidth, c640PixelHeight);
}

function setCanvasSize800() {
	setCanvasSize(c800PixelWidth, c800PixelHeight);
}

function setCanvasSize1024() {
	setCanvasSize(c1024PixelWidth, c1024PixelHeight);
}

function setCanvasSize(width, height) {
	hCanvas.width = width;
    hCanvas.height = height;
}

function setGameState(state) {
	handleState.updateState(state);
}

function getGameState() {
	return handleState.viewState();
}

function initCanvas() {
	hCanvas = document.getElementById('canvas');
	hDrawingContext = hCanvas.getContext('2d');
	
	hCanvas.addEventListener("click", engineOnClick, false);
	
    hCanvas.width = cMobilePixelWidth;
    hCanvas.height = cMobilePixelHeight;
}

function engineOnClick(e) {
    var clickRect = getCursorPosition(e);
	var oClicked;
	
	//click check for button
	for( var i = 0; i < Buttons.size(); i++ )
    {
		//check only button available in current state 
		if (isButtonState(Buttons.indexOfVal(i).name))
		{
			//do some collision detection to see what button clicked on
			oClicked = clickCollide(clickRect, Buttons.indexOfVal(i));
			if (oClicked != null)
			{
				break;
			}
		}
    }
	
	//click check for actor
	for( var i = 0; i < Actors.size(); i++ )
    {
		//do some collision detection to see what button clicked on
		oClicked = clickCollide(clickRect, Actors.indexOfVal(i));
		if (oClicked != null)
		{
			break;
		}
    }
	
	//check if user has extended the function
	if(typeof clickEvent == 'function') {
		//user extended the function, so call it
		clickEvent(oClicked);
	}
}