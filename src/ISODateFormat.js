var ISODateFormat = (function () {
	
	function Formatter() {
		
	}
	Formatter.prototype = {
		"constructor": Formatter
		, "parse": function () {}
		, "format": function () {}
	};
	
	return {
		"date": "date"
		 , "dateTime": "dateTime"
		, "create": function () {
			return new Formatter();
		}
	};
})();