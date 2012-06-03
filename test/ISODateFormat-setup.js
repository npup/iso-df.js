TestCase("setup", {

  "setUp": function () {}

  , "testModuleDefined": function () {
    assertObject("ISODateFormat should be defined as an object", window.ISODateFormat);
  }

});
