const express = require("express");
const app = require("./main").app;
const session = require('express-session');
const MySQLStore = require("express-mysql-session");
const bodyParser = require("body-parser");
const db = require("./db");
const sessionStore = new MySQLStore(db.connectionOptions, db.connection);

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded(
{
	extended: false
}));

app.use(bodyParser.json());

app.use(session(
{
	key: 'docentes_sys_session',
	secret: 'docentes_sys_session',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
	cookie:
	{
		maxAge: 2628003600 // 31 days
	}
}));