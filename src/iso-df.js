// TODO: support extended/nonextended mode
/*
* isoDateFormat, format and parse dates
*
* API:
*
*   isoDateFormat.create:   factory method for obtaining formatter instances
*   isoDateFormat.date:     constant for date formatter
*   isoDateFormat.dateTime  constant for date-time formatter
*
*   Formatter instances have two methods:
*     format: formats a supplied date according to the instance's type setting, returns string
*     parse: parses a string according to the instance's type setting, returns date
*
* Usage:
*
*   var df = isoDateFormat.create(); // obtain date formatter using default type (isoDateFormat.date)
*   df.format(new Date()); // yyyy-MM-dd, ex: "2012-06-04"
*   df.parse("2012-06-04"); // date obj for 2012-06-04 00:00
*
*   var dtf = isoDateFormat.create(isoDateFormat.dateTime); // obtain date-time formatter
*   dtf.format(new Date()); // yyyy-MM-dd hh:mm, ex: "2012-06-04 09:35"
*   dtf.parse("2012-06-04 09:35"); // date obj for 2012-06-04 09:35
*
*   #parse returns null for invalid formats and invalid dates
*
*/
var isoDateFormat;
("undefined"==typeof isoDateFormat) && (isoDateFormat = (function () {

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
    var date = null
      , instance = this, parts = getParts(instance, dateStr);

    if (parts) {
      date = new Date(parts.yyyy, parts.MM-1, parts.dd, parts.hour, parts.min, parts.sec);
      if (date.getFullYear()!==parts.yyyy || date.getMonth()!==(parts.MM-1) || date.getDate()!==parts.dd) {
          return null;
      }
      else if (instance.type == Type.dateTime) {
        if (date.getHours()!==parts.hour || date.getMinutes()!==parts.min) {
          return null;
        }
      }
    }
    return date;
  }


  function getParts(instance, dateStr) {
    var match = isoExpr.exec(dateStr)
      , yyyy, MM, dd
      , hour = 0, min = 0, sec = 0;
    if (!match) {return null;}
    yyyy = ~~match[1];
    MM = ~~match[2];
    dd = ~~match[3];
    if (match[4]) {
      if (instance.type != Type.dateTime) {return null;}
      else {
        hour = ~~match[4];
        min = ~~match[5];
        match[6] && (sec = ~~match[6]);
      }
    }
    else if (instance.type != Type.date) {return null;}
    return {
      "yyyy": yyyy,
      "MM": MM,
      "dd": dd,
      "hour": hour,
      "min": min,
      "sec": sec
    };
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
})());

(function () {
  var toExport = {"isoDateFormat": isoDateFormat};
  (function() {
    var undefinedType = "undefined";
    if (undefinedType!=typeof module && undefinedType != typeof module.exports && "function" == typeof require) {
      for (var name in this) {exports[name] = this[name];}
    }
  }).call(toExport);
})();
