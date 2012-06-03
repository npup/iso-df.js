TestCase("parse-dateOnly", {

  "setUp": function () {
		this.formatter = ISODateFormat.create(ISODateFormat.date);
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
		]
		, actual;
		for (var idx=0, len = corrects.length, entry; idx<len; ++idx) {
			entry = corrects[idx];
			assertEquals(entry.expected, formatter.parse(entry.str));
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
			assertNull(formatter.parse(erronous[idx]));
		}
	}

});


TestCase("parse-dateTime", {

  "setUp": function () {
		this.formatter = ISODateFormat.create(ISODateFormat.dateTime);
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
		]
		, actual;
		for (var idx=0, len = corrects.length, entry; idx<len; ++idx) {
			entry = corrects[idx];
			assertEquals(entry.expected, formatter.parse(entry.str));
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
		];
		for (var idx=0, len = erronous.length; idx<len; ++idx) {
			assertNull(formatter.parse(erronous[idx]));
		}
	}

});
