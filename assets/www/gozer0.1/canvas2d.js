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

//render loop
function draw() {
	//check if user has extended the function
	if(typeof drawEvent == 'function') {
		//user extended the function, so call it
		drawEvent();
	}
	
	//clean the canvas
	hDrawingContext.clearRect(0, 0, hCanvas.width, hCanvas.height);
	
	//fill back
	hDrawingContext.fillStyle = hCanvasFill;
	hDrawingContext.fillRect(0, 0, hCanvas.width, hCanvas.height);
	
	//draw background
	hDrawingContext.drawImage(backImage, 0, 0, hCanvas.width, hCanvas.height);
	
	//draw actors
	for( var i = 0; i < Actors.size(); i++ )
    {
		hDrawingContext.drawImage(Actors.indexOfVal(i).hImage, Actors.indexOfVal(i).x, Actors.indexOfVal(i).y, Actors.indexOfVal(i).width, Actors.indexOfVal(i).height);
	}
	
	//dra particles

	//draw buttons
	for( var i = 0; i < Buttons.size(); i++ )
    {
		//draw only if is in correct state
		if (isButtonState(Buttons.indexOfVal(i).name))
		{
			hDrawingContext.drawImage(Buttons.indexOfVal(i).hImage, Buttons.indexOfVal(i).x, Buttons.indexOfVal(i).y, Buttons.indexOfVal(i).width, Buttons.indexOfVal(i).height);
		}		
    }
	
	//draw front images
	hDrawingContext.drawImage(frontImage, 0, 0, hCanvas.width, hCanvas.height);
}