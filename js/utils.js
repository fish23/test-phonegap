var utils = 
{
	isObject: function(input)
	{
		return (typeof input === "object" && Object.prototype.toString.call(input) !== '[object Array]');
	},
	isArray: function(input)
	{
		return (typeof input === "object" && Object.prototype.toString.call(input) === '[object Array]');
	},
	isNumber: function(input)
	{
		return (typeof input === "number");
	},
	isString: function(input)
	{
		return (typeof input === "string");
	},
	isFloat: function(input)
	{
		return (typeof input === "number" && input !== Math.floor(input));
	},
	isInteger: function(input)
	{
		return (typeof input === "number" && input === Math.floor(input));
	},
	isSet: function(input)
	{
		return (typeof input !== "undefined");
	},
	isEmpty: function(input)
	{
		return (((this.isInteger(input) === true || this.isFloat(input)) && input === 0) || (this.isString(input) === true && input === '') || this.isSet(input) === false);
	},
	isNull: function(input)
	{
		return (typeof input === "object" && Object.prototype.toString.call(input) !== '[object Null]');
	},

	getActivePage: function()
	{
		return $("body").pagecontainer("getActivePage")[0].id;
	},
	changePage: function(page)
	{
		$("body").pagecontainer("change", "#"+page);
		return;
	}
	
}