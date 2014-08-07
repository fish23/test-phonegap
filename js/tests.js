function TestsException(message) 
{
   this.message = message; 
}

var TestsUtils =
{ 
	assertEquals: function(input1, input2)
	{
		if(typeof input1 === "undefined" || typeof input2 === "undefined") throw new TestsException('assertEquals need 2 input variables for compare');
		if(typeof input1 !== typeof input2) return false;
		if(typeof input1 !== "object")
		{
			return (input1 === input2);
		}
		var isEqual = true;
		for(index in input1)
		{
			if(input2.hasOwnProperty(index) === false) return false;
			if(input1[index] !== input2[index]) return false;
		}
	},
	assertSet: function(input)
	{
		return (typeof input !== "undefined");
	},
	assertTrue: function(input)
	{
		return (input === true);
	},
	assertFalse: function(input)
	{
		return (input === false);
	},
	assertArray: function(input)
	{
		return (typeof input === "object" && Object.prototype.toString.call(input) === '[object Array]');
	},
	assertArrayIntegers: function(input)
	{
		if(typeof input !== "object" || Object.prototype.toString.call(input) !== '[object Array]') return false;
		return (TestsUtils._iterate(input, true, false, false) !== false);
	},
	assertArrayFloats: function(input)
	{
		if(typeof input !== "object" || Object.prototype.toString.call(input) !== '[object Array]') return false;
		return (TestsUtils._iterate(input, false, true, false) !== false);
	},
	assertArrayNumbers: function(input)
	{
		if(typeof input !== "object" || Object.prototype.toString.call(input) !== '[object Array]') return false;
		return (TestsUtils._iterate(input, true, false, false) !== false);
	},
	assertArrayStrings: function(input)
	{
		if(typeof input !== "object" || Object.prototype.toString.call(input) !== '[object Array]') return false;
		return (TestsUtils._iterate(input, false, false, true) !== false);
	},
	assertObject: function(input)
	{
		return (typeof input === "object" && Object.prototype.toString.call(input) !== '[object Array]');
	},
	assertNull: function(input)
	{
		return (typeof input === "object" && Object.prototype.toString.call(input) !== '[object Null]');
	},
	assertNumber: function(input)
	{
		return (typeof input === "number");
	},
	assertString: function(input)
	{
		return (typeof input === "string");
	},
	assertFloat: function(input)
	{
		return (typeof input === "number" && input !== Math.floor(input));
	},
	assertInteger: function(input)
	{
		return (typeof input === "number" && input === Math.floor(input));
	},
	assertUndefined: function(input)
	{
		return (typeof input === "undefined");
	},
	_iterate: function(input, _integer, _float, _string, _max, _level)
	{
		_integer = _integer || false;
		_float   = _float || false;
		_string  = _string || false;
		_max     = _max || 1;
		_level   = _level || 1;
		_level   = (_level < 1) ? 1 : _level;
		for(i in input) 
		{
			if(_string === true && typeof input[i] !== "string") return false;
			if(_integer === true && (typeof input[i] !== "number" || input[i] !== Math.floor(input[i]))) return false;
			if(_float === true && (typeof input[i] !== "number" || input[i] === Math.floor(input[i]))) return false;
			if(typeof input === "object" && Object.prototype.toString.call(input) === '[object Array]')
			{
				if(TestsUtils._iterate(input, _integer, _float, _string) === false) return false;
			}
		}
	}
};


function Tests() {
	this.tests    = [];
	this.errorMsg = "";
	this.done     = false;
}

Tests.prototype.run = function()
{
	this.done  = false;
	this.tests = [];
	try
	{
		for(name in this)
		{
			if(typeof this[name] === "function" && (name !== "run" && name !== "result"))
			{
				var test = { name: name };
				this.errorMsg = "";
				try
				{
					test.result = this[name]();
				}
				catch(e)
				{
					else if(e instanceof TestsException)
					{
						this.errorMsg = "TestsException: "+e.message;
						continue;
					}
					else
					{
						this.errorMsg = "Exception: "+e.message;
					}
				}
				var textResult = (test.result === true) ? "OK" : "FAIL";
				test.log = textResult;
				test.log += (test.result === true) ? "  " : "";
				test.log += " ... test '"+name+"' ";
				if(this.errorMsg !== "") test.log += " Err: " + this.errorMsg;
				this.tests.push(test);
			}
		}
		this.done = true;
	}
	catch(e)
	{
		if(e instanceof NNTestsException) 
		{
			console.log("TestsException FATAL: "+e.message);
		}
	}
}

Tests.prototype.result = function()
{
	if(this.done === false) throw new TestsException("Test results show only after successfully run tests");
	for(index in this.tests)
	{
		console.log(this.tests[index].log);
	}
}

Tests.prototype.configEmpty = function()
{
	try
	{
		this.nn.config();
	}
	catch(e)
	{
		if(e instanceof Exception)
		{
			return true;
		}
	}
	return false;
	
}


