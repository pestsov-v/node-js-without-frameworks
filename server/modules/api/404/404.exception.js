const statusCode = require("../../../src/core/base/statusCode");
const { PAGE_NOT_FOUND_MESSAGE } = require("./404.constants");

exports.PAGE_NOT_FOUND = (host, path) => {
  return {
    statusCode: statusCode.NOT_FOUND,
    message: PAGE_NOT_FOUND_MESSAGE(host, path),
  };
};
