var fs = require("fs");
// ipware module allows for ipAddress tracking
var get_ip = require('ipware')().get_ip;

function reqLogger (req) {
  var ip_info = get_ip(req);
  // { clientIp: '127.0.0.1', clientIpRoutable: false }
  var now = new Date();
  var date = now.getMonth()+1 + "-" + now.getDate() + "-" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds();
  var logLine = date + "\t" + req.method + "\t" + req.url + "\t" + ip_info.clientIp + "\n";
  fs.appendFile("./logs/app.log", logLine, 'utf8' ,function(err) {
    if (err) {
      throw err;
    }
    console.log(req.method + " request for " + req.url + " - " + JSON.stringify(req.body));
  });
}

module.exports = reqLogger;
