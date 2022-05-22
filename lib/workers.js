const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const url = require("url");
const _data = require("./data");
const helpers = require("./handlers");

const workers = {};

workers.init = function () {};

module.exports = workers;
