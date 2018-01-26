const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const logger = require('./lib/logger');

const app = express();
const port = process.argv[2];
logger.init(process.argv[3]);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use('/css',express.static(__dirname + '/view/css'));
app.use('/images',express.static(__dirname + '/view/images'));
app.use('/script',express.static(__dirname + '/view/script'));

app.set('views', __dirname + '/view/ejs');
app.set('view engine', 'ejs');

require("fs").readdir('./routes', function (err, files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.substr(file.length - 3, 3) === ".js") {
            var filename = file.substr(0, file.length - 3);
            logger.log("[Server] Added route:" + filename);
            app.use('/' + filename, require("./routes/" + file));
        }
    }
});

http.createServer(app).listen(port);
logger.log("[Server] Server started on port " + port);