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

//click event collision detection
function clickCollide(mouseRect, objectRect) {
	var collide;
	
	if ((mouseRect.x + mouseRect.width) >= objectRect.x && mouseRect.x <= (objectRect.x + objectRect.width) && 
        (mouseRect.y + mouseRect.height) >= objectRect.y && mouseRect.y <= (objectRect.y + objectRect.height)) {
		collide = objectRect.name;
	}
	
	return collide;
}

//click event
function getCursorPosition(e) {
    var x;
    var y;
	
	//first get x and y coordinates that are relative to the document
    if (e.pageX != undefined && e.pageY != undefined) {
	x = e.pageX;
	y = e.pageY;
    }
	
	//next get x and y coordinates that are relative to canvas
    x -= hCanvas.offsetLeft;
    y -= hCanvas.offsetTop;
	
	var mRect = new Rect();
    mRect.setRect("click", x, y, 1, 1, null);
    return mRect;
}