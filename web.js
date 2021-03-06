// Generated by CoffeeScript 1.12.2
(function() {
  var app, express;

  express = require('express');

  app = express();

  module.exports = {
    start: function(cameras, settings) {
      app.use(express["static"](__dirname + '/public'));
      app.get('/connect', function(req, res) {
        var id, ip;
        id = req.query.id;
        ip = req.query.ip;
        if (ip === null) {
          ip = '127.0.0.1';
        }
        if (id && id <= cameras.length) {
          cameras[id].connect(ip, true, 1000, 1111);
          return res.end("connecting " + id + " to " + ip + "\n");
        } else {
          return res.status(404).json('no camera found, use ?id=');
        }
      });
      app.get('/disconnect', function(req, res) {
        var id;
        id = req.query.id;
        if (id && id <= cameras.length) {
          cameras[id].disconnect();
          return res.end("disconnecting " + id + "\n");
        } else {
          return res.status(404).json('no camera found, use ?id=');
        }
      });
      app.get('/status', function(req, res) {
        var id, iii, statusRes, tempStatus;
        id = req.query.id;
        if (id && (0 < id && id <= cameras.length)) {
          return res.status(200).json(cameras[id].status);
        } else if (id === "0") {
          statusRes = [];
          iii = 0;
          while (iii <= cameras.length) {
            tempStatus = cameras[iii + 1];
            if (tempStatus) {
              tempStatus = tempStatus.status;
              statusRes[iii] = tempStatus;
            }
            iii++;
          }
          return res.status(200).json(statusRes);
        } else {
          return res.status(404).json('no camera found, use ?id=');
        }
      });
      app.get('/settings', function(req, res) {
        return res.status(200).json(settings);
      });
      return app.listen(3000, function() {
        return console.log('Red app listening on port 3000!');
      });
    }
  };

}).call(this);
