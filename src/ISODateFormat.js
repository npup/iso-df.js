/*
* TODO: support extended/nonextended mode
*/
var ISODateFormat = (function () {

	var isoExpr = /^\s*(\d{4})-([01]\d)-([0123]\d)[T ]?(?:(\d{2}):(\d{2})(?::(\d{2}))?)?\s*$/;

	function Formatter(type) {
		(typeof type=="undefined") && (type = Type.date);
		this.type = type;
	}

	function format(date) {
		var result;
		result = ([leftPad(date.getFullYear(), 4), leftPad(date.getMonth()+1, 2), leftPad(date.getDate(), 2)].join("-"));
		if (this.type === Type.dateTime) {
			result += " "+[leftPad(date.getHours(), 2), leftPad(date.getMinutes(), 2)].join(":");
		}
		return result;
	}

	function parse(dateStr) {
		var date = null, match = isoExpr.exec(dateStr)
			, yyyy, MM, dd, hh, mm
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

	function leftPad(number, positions) {
	  var asStr = ""+number;
	  return (Array(1+positions-asStr.length).join("0"))+asStr;
	}

	return {
		"date": "date"
		 , "dateTime": "dateTime"
		, "create": function () {
			return new Formatter(arguments[0]);
		}
	};
})();
