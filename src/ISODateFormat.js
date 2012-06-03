var ISODateFormat = (function () {
	
	var isoExpr = /^\s*(\d{4})-([01]\d)-([0123]\d)[T ]?(?:(\d{2}):(\d{2})(?::(\d{2}))?)?\s*$/;
	
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
	
	function parse(dateStr) {
		var date = null
			, match = isoExpr.exec(dateStr);
		var yyyy, MM, dd, hh, mm
			, hour=0, min=0, sec=0;

		if (match) {
			yyyy = ~~match[1];
			MM = ~~match[2];
			dd = ~~match[3];
			
			if (match[4]) {
				if (this.type != Type.dateTime) {
					return null;
				}
				else {
					hour = ~~match[4];
					min = ~~match[5];
					match[6] && (sec = ~~match[6]);
				}
			}
			else if (this.type != Type.date) {
				return null;
			}
			date = new Date(yyyy, MM-1, dd, hour, min, sec);
			if (date.getFullYear()!==yyyy || date.getMonth()!==(MM-1) || date.getDate()!==dd) {
					date = null;
			}

		}
		return date;
	}

	Formatter.prototype = {
		"constructor": Formatter
		, "parse": parse
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