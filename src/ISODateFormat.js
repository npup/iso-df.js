var ISODateFormat = (function () {
	
	function Formatter(type) {
		(typeof type=="undefined") && (type = Type.date);
		this.type = type;
	}
	
	function format(date) {
		var yyyy = date.getFullYear()
			, MM = date.getMonth()+1
			, dd = date.getDate()
			, str;
		var yearString = ""+yyyy;
		while (yearString.length<4) {
			yearString = "0"+yearString;
		}
		str = ([yearString, (MM<10?("0"+MM):MM), (dd<10?("0"+dd):dd)].join("-"));
		return str;
	}
	
	Formatter.prototype = {
		"constructor": Formatter
		, "parse": function () {}
		, "format": format
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