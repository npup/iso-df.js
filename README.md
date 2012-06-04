ISODateFormat
=============

parse/format iso dates. under construction.



Usage
-----

	var f = ISODateFormat.create();
	f.format(new Date()); // yyyy-MM-dd
	f.parse("2012-06-04"); // date obj

	var f2 = ISODateFormat.create(ISODateFormat.dateTime);
	f2.format(new Date()); // yyyy-MM-dd hh:mm
	f2.parse("2012-06-04 12:45"); // date obj

`#parse` returns `null` for invalid formats and invalid dates.
