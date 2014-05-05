/*jshint
  undef: false
*/

var buster = require("buster");
var isoDateFormat = require("../build/iso-df").isoDateFormat;
var assert = buster.assert;

buster.testCase("iso-df::setup", {
  "isoDateFormat should be defined as an object": function () {
    assert.isObject(isoDateFormat);
  }
  , "presence of constants": function () {
    assert.equals("date", isoDateFormat.date);
    assert.equals("dateTime", isoDateFormat.dateTime);
  }
  , "presence of factory method": function () {
    assert.isFunction(isoDateFormat.create);
  }
  , "isoDateFormat exposes a minimal API": function () {
    var api = {"date":true, "dateTime":true, "create":true}
      , exposedCount = 0;
    for (var exposed in isoDateFormat) {
      if (!api.hasOwnProperty(exposed)) {
        refute.defined(isoDateFormat[exposed], "API should not expose anything called '"+exposed+"'");
      }
      ++exposedCount;
    }
    if (exposedCount>0) {
      assert(true);
    }
  }
  , "test factory method": function () {
    assert.isObject(isoDateFormat.create());

    var formatter = isoDateFormat.create(isoDateFormat.date);
    assert.isFunction(formatter.parse);
    assert.isFunction(formatter.format);

    formatter = isoDateFormat.create(isoDateFormat.date);
    assert.equals(isoDateFormat.date, formatter.type);

    formatter = isoDateFormat.create(isoDateFormat.dateTime);
    assert.equals(isoDateFormat.dateTime, formatter.type);

    formatter = isoDateFormat.create();
    assert.equals(isoDateFormat.date, formatter.type);
  }

});


buster.testCase("iso-df::parse dateOnly", {
  "setUp": function () {
    this.formatter = isoDateFormat.create(isoDateFormat.date);
  }
  , "testParseSaneInput": function () {
    var formatter = this.formatter
      , corrects = [
      {
        "str": "2000-10-20"
        , "expected": new Date(2000, 9, 20)
      }
      , {
        "str": "2010-12-01"
        , "expected": new Date(2010, 11, 1)
      }
      , {
        "str": "2012-02-29"
        , "expected": new Date(2012, 1, 29)
      }
    ];

    for (var idx=0, len = corrects.length, entry; idx<len; ++idx) {
      entry = corrects[idx];
      assert.equals(entry.expected, formatter.parse(entry.str));
    }
  }
  , "testParseErronousInput": function () {
    var formatter = this.formatter
      , erronous = [
        void 0, null, "", NaN, {}, function () {}, new Date(), new RegExp() // just silly inputs
        , "2010-12-01 18:45" // wrong type
        , "2012-13-01" // invalid dates
        , "1999-01-45"
        , "2007-02-29"
        , "2012-02-30"
        , "2012-02--4"
        , "2Oll-OS-O1"
      ];
    for (var idx=0, len = erronous.length; idx<len; ++idx) {
      assert.isNull(formatter.parse(erronous[idx]));
    }
  }
});


buster.testCase("iso-df::parse dateTime", {
  "setUp": function () {
    this.formatter = isoDateFormat.create(isoDateFormat.dateTime);
  }
  , "testParseSaneInput": function () {
    var formatter = this.formatter
      , corrects = [
        {
          "str": "2000-10-20 19:45"
          , "expected": new Date(2000, 9, 20, 19, 45)
        }
        , {
          "str": "2000-10-20 19:42"
          , "expected": new Date(2000, 9, 20, 19, 42)
        }
        , {
          "str": "2000-10-20 19:42:59"
          , "expected": new Date(2000, 9, 20, 19, 42, 59)
        }
      ];
    for (var idx=0, len = corrects.length, entry; idx<len; ++idx) {
      entry = corrects[idx];
      assert.equals(entry.expected, formatter.parse(entry.str));
    }
  }
  , "testParseInvalidInput": function () {
    var formatter = this.formatter
      , erronous = [
        "2000-10-29"
        , "2012-01-01 19" // invalid date-times
        , "2012-01-01 19-45"
        , "2012-01-01 a"
        , "2012-01-01 9:25"
        , "2012-01-01 19:2"
        , "2012-01-01 19:00:0"
        , "2010-12-01"
        , "2012-02-29"
        , "2012-02-01 25:00"
        , "2012-02-01 01:60"
      ];
    for (var idx=0, len = erronous.length; idx<len; ++idx) {
      assert.isNull(formatter.parse(erronous[idx]));
    }
  }

});


buster.testCase("iso-df::format dateOnly", {
  "setUp": function () {
    this.formatter = isoDateFormat.create(isoDateFormat.date);
  }
  , "testFormats": function () {
    var formatter = this.formatter
      , attempts = [
        {
          "date": new Date(2011, 1, 10)
          , "expected": "2011-02-10"
        }
        , {
          "date": new Date(742, 1, 10)
          , "expected": "0742-02-10"
        }
        , {
          "date": new Date(1, 1, 28)
          , "expected": "1901-02-28"
        }
        , {
          "date": new Date(1, 1, 28, 20, 25)
          , "expected": "1901-02-28"
        }
      ];

    var earlyDate = new Date(0, 0, 1); // created as "1900-01-01" :(
    earlyDate.setFullYear(0); // year 0 now
    attempts.push({"date":earlyDate, "expected": "0000-01-01"});

    for (var idx=0, len=attempts.length, attempt; idx<len; ++idx) {
      attempt = attempts[idx];
      assert.equals(attempt.expected, formatter.format(attempt.date));
    }
  }
});

buster.testCase("iso-df::format dateOnly", {
  "setUp": function () {
    this.formatter = isoDateFormat.create(isoDateFormat.dateTime);
  }
  , "testFormats": function () {
    var formatter = this.formatter
      , attempts = [
        {
          "date": new Date(2011, 1, 10, 19, 59)
          , "expected": "2011-02-10 19:59"
        }
        , {
          "date": new Date(742, 1, 10, 12, 45)
          , "expected": "0742-02-10 12:45"
        }
        , {
          "date": new Date(1, 1, 28, 20, 45)
          , "expected": "1901-02-28 20:45"
        }
        , {
          "date": new Date(1, 1, 28)
          , "expected": "1901-02-28 00:00"
        }
      ];

    var earlyDate = new Date(0, 0, 1, 9, 5); // created as "1900-01-01 09:05" :(
    earlyDate.setFullYear(0); // year 0 now
    attempts.push({"date":earlyDate, "expected": "0000-01-01 09:05"});

    for (var idx=0, len=attempts.length, attempt; idx<len; ++idx) {
      attempt = attempts[idx];
      assert.equals(attempt.expected, formatter.format(attempt.date));
    }
  }
});
