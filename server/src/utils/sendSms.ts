import { twilio } from "../../config/variables.config";
import { request } from "https";
import { stringify } from "querystring";

const sendSms = (phone, msg, callback) => {
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
      From: '+380951699263',
      To: `+380${phone}`,
      Body: msg,
    };

    const stringPayload = stringify(payload);
    const requestDetails = {
      protocol: "https:",
      hostname: "api.twilio.com",
      method: "POST",
      path: `/2010-04-01/Accounts/ACb32d411ad7fe886aac54c665d25e5c5d/Messages.json`,
      auth: `ACb32d411ad7fe886aac54c665d25e5c5d:9455e3eb3109edc12e3d8c92768f7a67`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(stringPayload),
      },
    };

    const req = request(requestDetails, function (res) {
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

export default sendSms;
