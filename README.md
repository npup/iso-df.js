isoDateFormat
=============

parse/format iso dates/date-times. under construction.

Build
-----
	targets:
		`make build`
		`make min`		# uglifyjs
		`make lint` 	# jshint
		`make test` 	# buster.js

Usage
-----

	var f = isoDateFormat.create();
	f.format(new Date()); // yyyy-MM-dd
	f.parse("2012-06-04"); // date obj

	var f2 = isoDateFormat.create(isoDateFormat.dateTime);
	f2.format(new Date()); // yyyy-MM-dd hh:mm
	f2.parse("2012-06-04 12:45"); // date obj

`#parse` returns `null` for invalid formats and invalid dates.
