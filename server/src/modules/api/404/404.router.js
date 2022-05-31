const statusCode = require("../../../core/base/statusCode");
const { PAGE_NOT_FOUND } = require("./404.exception");
const page404 = function (data, callback) {
  return callback(
    statusCode.NOT_FOUND,
    PAGE_NOT_FOUND(data.headers.host, data.trimmedPath)
  );
};

module.exports = page404;
