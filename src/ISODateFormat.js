var ISODateFormat = (function () {
	
	function Formatter(type) {
		(typeof type=="undefined") && (type = Type.date);
		this.type = type;
	}
	Formatter.prototype = {
		"constructor": Formatter
		, "parse": function () {}
		, "format": function () {}
	};
	
	var Type = {
		"date": "date"
		, "dateTime": "dateTime"
	};
	
	return {
		"date": "date"
		 , "dateTime": "dateTime"
		, "create": function () {
			return new Formatter(arguments[0]);
		}
	};
})();