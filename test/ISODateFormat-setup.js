TestCase("setup", {

  "setUp": function () {}

  , "testModuleDefined": function () {
    assertObject("ISODateFormat should be defined as an object", window.ISODateFormat);
  }

	, "testModuleExposedConstants": function () {
		assertEquals("date", ISODateFormat.date);
		assertEquals("dateTime", ISODateFormat.dateTime);
	}

	, "testModuleExposesFactoryMethod": function () {
		assertFunction("ISODateFormat should expose a function 'create'", ISODateFormat.create);
	}

	, "testModuleMinimalAPI": function () {
		var api = {"date":true, "dateTime":true, "create":true};
		for (var exposed in ISODateFormat) {
			if (!api.hasOwnProperty(exposed)) {
				fail("Module API should not expose anything called '"+exposed+"' (type "+(typeof ISODateFormat[exposed])+")");
			}
		}
	}
	
	, "testModuleFactoryMethod": function () {
		assertObject("ISODateFormat.create should return an object", ISODateFormat.create());
		
		var formatter = ISODateFormat.create(ISODateFormat.date);
		assertFunction("formatter object should have a function 'parse'", formatter.parse);
		assertFunction("formatter object should have a function 'format'", formatter.format);
	}

});
