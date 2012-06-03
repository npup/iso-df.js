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

});
