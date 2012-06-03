TestCase("format-dateOnly", {

	"setUp": function () {
		this.formatter = ISODateFormat.create(ISODateFormat.date);
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
		earlyDate.setFullYear(0);
		attempts.push({"date":earlyDate, "expected": "0000-01-01"});
		
		for (var idx=0, len=attempts.length, attempt; idx<len; ++idx) {
			attempt = attempts[idx];
			assertEquals(attempt.expected, formatter.format(attempt.date));
		}
	}

});
