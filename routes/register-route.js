const app = require("../main").app;
const db = require("../db");
const util = require("util");
const validate = require("../utils/validate");

app.get("/register", (req, res) =>
{
	res.render("register.hbs");
});

app.post("/register", async (req, res) =>
{
	let getUser = util.promisify(db.getUser),
		addUser = util.promisify(db.addUser),
		user = req.body;
	try
	{
		let result = await getUser(user.username, null);
		if (result)
		{
			res.send(validate.setError("El nombre de usuario indicado ya existe"));
			return;
		}
		await addUser(user);
		req.session.user = user;
		res.send({ success: true, url: "/" });
		return;
	}
	catch (error)
	{
		res.send(error);
	}
});