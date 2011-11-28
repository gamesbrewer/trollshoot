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

//a user defined collection type
function Map()
{
    // members
    this.keyArray = new Array(); // Keys
    this.valArray = new Array(); // Values
        
    // methods
    this.add = add; //add an item
    this.getVal = getVal; //get value based on key
	this.indexOfKey = indexOfKey; //get key based on index
	this.indexOfVal = indexOfVal; //get value based on index
    this.size = size; //check size of map
    this.clear = clear; //remove all items
    this.remove = remove; //remove an item
}

//add an item. if key already exist do nothing
function add(key, value)
{
    var elementIndex = this.keyArray.find(key);
    
    if(elementIndex == (-1))
    {
        this.keyArray.push(key);
        this.valArray.push(value);
    }
}

//get key based on index
function indexOfKey(index)
{
    return this.keyArray[index];
}

//get value based on index
function indexOfVal(index)
{
    return this.valArray[index];
}

//get value based on key
function getVal(key)
{
    var value = null;
    var elementIndex = this.keyArray.find(key);
	
    if(elementIndex != (-1))
    {   
        value = this.valArray[elementIndex];
    }  
    
    return value;
}

function remove(key)
{
    var result = null;
    var elementIndex = this.keyArray.find(key);

    if(elementIndex != (-1))
    {
		//we call the removeAt prototype
        this.keyArray = this.keyArray.removeAt(elementIndex);
        this.valArray = this.valArray.removeAt(elementIndex);
    }
}

function size()
{
    return this.keyArray.length;
}

function clear()
{
    for( var i = 0; i < this.keyArray.length; i++ )
    {
        this.keyArray.pop(); this.valArray.pop();   
    }
}

function find(key)
{ 
	var result = (-1);
	
	for (var i = 0; i <= this.length; i++)
	{
		if (this[i] == key) 
		{
			result = i;
			break;
		}
	}
	return result; 
}
Array.prototype.find = find;

//we slice out the the before part and after part, then concatenate both part again minus the one we removed,
//and it is now in running number, and return that. We have to do this by prototyping the function because
//JavaScript collection doesn't have adding or removing items by default
function removeAt(index)
{
  var part1 = this.slice(0, index);
  var part2 = this.slice(index+1);

  return( part1.concat( part2 ) );
}
Array.prototype.removeAt = removeAt;