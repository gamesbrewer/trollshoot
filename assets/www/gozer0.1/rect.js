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

//user defined type for a rectangle
function Rect()
{
    // members
    this.name;
	this.x;
	this.y;
	this.width;
	this.height;
	this.hImage;
	this.frame;
	this.currentFrame;
	
	// methods
    this.setRect = setRect; //add an item
	this.getNextFrame = getNextFrame; //get next frame
}

function setRect(name, x, y, width, height, hImage, frame) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.hImage = hImage;
	this.frame = frame;
	this.currentFrame = 1;
}

function getNextFrame() {
	this.currentFrame++;
	if (this.currentFrame == this.frame) {
		this.currentFrame = 0;
	}
	
	return this.currentFrame;
}