var querystring = require('querystring');
var http = require('http');

exports.geqeRequest = function (path, method, data, success, error) {
  var host = process.env.GEQEDATASERVICE_PORT_3001_TCP_ADDR || 'localhost';
  var port = process.env.GEQEDATASERVICE_PORT_3001_TCP_PORT || '5500';
  return exports.request(host, port, path, method, data, success, error);
};

exports.request = function (hostname, port, path, method, data, success, error) {
  var dataString = null;
  var headers = {};

  if (data) {
    if (method == 'GET') {
      path += '?' + querystring.stringify(data);
    }
    else {
      dataString = JSON.stringify(data);
      headers = {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length
      };
    }
  }

  var options = {
    hostname: hostname,
    port: port,
    path: path,
    method: method,
    headers: headers
  };

  var req = http.request(options, function (res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function (data) {
      responseString += data;
    });

    res.on('end', function () {
      //console.log(responseString);
      var responseObject = null;
      try {
        responseObject = JSON.parse(responseString);
      } catch (e) {
        responseObject = responseString;
        console.log(responseString);
      }
      success(responseObject);
    });
  });

  if (dataString) {
    req.write(dataString);
  }

  req.on('error', function (e) {
    if (error)
      error(e);
  });

  req.end();
};
