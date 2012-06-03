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

});
