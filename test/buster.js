var module
  , config = module.exports;

config["My tests"] = {
  env: "browser" // or "node"
  , "rootPath": "../"
  , "sources": [ // Paths are relative to config file
    "src/iso-df.js"
  ]
  , "tests": [
    "test/iso-df-test.js"
  ]
};
