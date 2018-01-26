var express = require('express');
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
    console.log("Rquest made!");
    res.send(code);
});

router.post('/set', function (req, res, next) {
    code = req.body.code;
    console.log(code);
    changed = true;
    res.send("Succes!");
});

router.get('/updated', function (req, res, next) {
    res.send(changed);
});

router.get('/notifyUpdate', function (req, res, next) {
    changed = true;
    res.send("Succes!");
});

module.exports = router;
