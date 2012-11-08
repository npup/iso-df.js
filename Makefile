#!/bin/bash
SRC = src/iso-df.js

all: min

lint:
	jshint --config .jshint-conf src/*.js

build: ${SRC}
	cat ${SRC} > ./build/iso-df.js

min: build
	uglifyjs build/iso-df.js > build/iso-df.min.js

test: build
	node test/iso-df-test.js