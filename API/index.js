var express = require('express');
let bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
if (process.env.NODE_ENV == undefined) {
    console.log("PROD ENV");
    require('custom-env').env();    
} else {
    console.log(process.env.NODE_ENV + " ENV");
    require('custom-env').env(process.env.NODE_ENV.toString())
}
const  json  = require('./package.json');

require("./services/bddService");

//Notifications
// const http = require('http');
// const server = http.createServer(app);
// var notificationService = require("./services/notificationService");
// notificationService.main(server);

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/portillon", require("./routes/portillonRoutes"));
// app.use("/sensor", require("./routes/sensorRoutes"));

app.get('/', (req, res) => {
    res.send("OK")
})

app.get('/version', (req, res) => {
    res.send(json.version)
})

app.listen(3000);
