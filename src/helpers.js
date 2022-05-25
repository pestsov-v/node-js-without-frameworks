const config = require("../config");
const https = require("https");
const querystring = require("querystring");

const helpers = {};


helpers.parceJsonToObject = function (str) {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

helpers.sendTwillioSMS = function (phone, msg, callback) {
  phone =
    typeof phone == "string" && phone.trim().length == 10
      ? phone.trim()
      : false;

  msg =
    typeof msg == "string" && msg.trim().length > 0 && msg.trim().length <= 1600
      ? msg.trim()
      : false;

  if (phone && msg) {
    const payload = {
      From: config.twilio.fromPhone,
      To: `+380${phone}`,
      Body: msg,
    };

    const stringPayload = querystring.stringify(payload);
    const requestDetails = {
      protocol: "https:",
      hostname: "api.twilio.com",
      method: "POST",
      path: `/2010-04-01/Accounts/${config.twilio.accountSid}/Messages.json`,
      auth: `${config.twilio.accountSid}:${config.twilio.authToken}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(stringPayload),
      },
    };

    const req = https.request(requestDetails, function (res) {
      const status = res.statusCode;
      if (status == 200 || status == 201) {
        callback(false);
      } else {
        callback(`Статус код отправки ${status}`);
      }
    });

    req.on("error", function (e) {
      callback(e);
    });

    req.write(stringPayload);
    req.end();
  } else {
    callback("Указанные параметры отсутствовали или были неверными");
  }
};

module.exports = helpers;
