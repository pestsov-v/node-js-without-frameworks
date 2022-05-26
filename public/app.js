const app = {};

app.config = {
  sessionToken: false,
};

app.client = {};

app.client.request = function (
  headers,
  path,
  method,
  queryStringObject,
  payload,
  callback
) {
  headers = typeof headers == "object" && headers !== null ? headers : {};
  path = typeof path == "string" ? path : "/";
  method =
    typeof method == "string" &&
    ["POST", "GET", "PUT", "DELETE"].indexOf(method) > -1
      ? method.toUpperCase()
      : "GET";
  queryStringObject =
    typeof queryStringObject == "object" && queryStringObject !== null
      ? queryStringObject
      : {};
  payload = typeof payload == "object" && payload !== null ? payload : {};
  callback = typeof callback == "function" ? callback : false;

  const requestUrl = path + "?";
  const counter = 0;
  for (const queryKey in queryStringObject) {
    if (queryStringObject.hasOwnProperty(queryKey)) {
      counter++;
      if (counter > 1) {
        requestUrl += "&";
      }

      requestUrl += queryKey + "=" + queryStringObject[queryKey];
    }
  }

  const xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  for (const headerKey in headers) {
    if (headers.hasOwnProperty(headerKey)) {
      xhr.setRequestHeader(headerKey, headers[headerKey]);
    }
  }

  if (app.config.sessionToken) {
    xhr.setRequestHeader("token", app.config.sessionToken.id);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const statusCode = xhr.status;
      const responseReturned = xhr.responseText;

      if (callback) {
        try {
          const parsedResponse = JSON.parse(responseReturned);
          callback(statusCode, parsedResponse);
        } catch (e) {
          callback(statusCode, false);
        }
      }
    }
  };

  const payloadString = JSON.stringify(payload);
  xhr.send(payloadString);
};

app.bindForms = function () {
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var formId = this.id;
    var path = this.action;
    var method = this.method.toUpperCase();

    document.querySelector("#" + formId + " .formError").style.display =
      "hidden";

    var payload = {};
    var elements = this.elements;
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].type !== "submit") {
        var valueOfElement =
          elements[i].type == "checkbox"
            ? elements[i].checked
            : elements[i].value;
        payload[elements[i].name] = valueOfElement;
      }
    }

    app.client.request(
      undefined,
      path,
      method,
      undefined,
      payload,
      function (statusCode, responsePayload) {
        if (statusCode !== 201) {
          var error =
            typeof responsePayload.Error == "string"
              ? responsePayload.Error
              : "An error has occured, please try again";

          document.querySelector("#" + formId + " .formError").innerHTML =
            error;

          document.querySelector("#" + formId + " .formError").style.display =
            "block";
        } else {
          app.formResponseProcessor(formId, payload, responsePayload);
        }
      }
    );
  });
};

app.formResponseProcessor = function (formId, requestPayload, responsePayload) {
  var functionToCall = false;
  if (formId == "accountCreate") {
  }
};

app.init = function () {
  app.bindForms();
};

window.onload = function () {
  app.init();
};
