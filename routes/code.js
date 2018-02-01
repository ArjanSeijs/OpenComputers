/*global */
var express = require('express');
var logger = require("../lib/logger");
var router = express.Router();

var code = 'local drone = component.proxy(component.list("drone")())\n' +
    '\n' +
    'local loop = 0\n' +
    'while true do\n' +
    '  drone.setStatusText(tostring(loop))\n' +
    '  loop = (loop + 1) % 40\n' +
    '  if(loop < 20) then\n' +
    '    if not drone.detect(1) then\n' +
    '      drone.move(0,1,0)\n' +
    '    end\n' +
    '  else\n' +
    '    if not drone.detect(0) then\n' +
    '      drone.move(0,-1,0)\n' +
    '    end\n' +
    '  end\n' +
    'end';
var changed = false;


/* GET home page. */
router.get('/get', function (req, res, next) {
    logger.log("[DroneCode] DroneCode Requested");
    res.send(code);
});

router.post('/set', function (req, res, next) {
    code = req.body.code;
    logger.log("[Code] DroneCode Set");
    logger.log("[Code]\n" + code);
    changed = true;
    res.send("Success!");
});

router.get('/updated', function (req, res, next) {
    res.send(changed);
});

router.get('/notifyUpdate', function (req, res, next) {
    changed = false;
    res.send("Success!");
});

module.exports = router;
