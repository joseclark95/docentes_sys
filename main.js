const express = require("express");
const hbs = require("hbs");
const app = express();
exports.app = app;

require("./middleware");

app.set('view engine', 'hbs');
require("./hbs-helpers");
hbs.registerPartials(__dirname + '/views/partials')

require("./routes/index-route");
require("./routes/login-route");
require("./routes/register-route");
require("./routes/admin-courses-route");

app.listen("3000");