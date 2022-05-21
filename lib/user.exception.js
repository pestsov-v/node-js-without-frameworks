const {
  USER_WAS_BEEN_CREATED,
  MISS_REQUIRED_FIELDS,
} = require("./lib.constants");

exports.userHasBeenCreated = {
  statusCode: 500,
  Error: USER_WAS_BEEN_CREATED,
};

exports.missedRequiredFields = {
  statusCode: 400,
  Error: MISS_REQUIRED_FIELDS,
};
