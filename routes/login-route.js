const app = require("../main").app;
const db = require("../db");
const validate = require("../utils/validate");

app.get("/login", (req, res) =>
{
	res.render("login.hbs");
});

app.post("/login", (req, res) =>
{
	let username = req.body.username,
		password = req.body.password;
	db.getUser(username, password, (error, result) =>
	{
		if (!error)
		{
			if (!result)
			{
				req.session.user = null;
				res.send(validate.setError("El nombre de usuario proporcionado no existe"));
				return;
			}
			req.session.user = result;
			res.send({ success: true, url: "/" });
			return;
		}
		req.session.user = null;
		res.send(error);
	});
});