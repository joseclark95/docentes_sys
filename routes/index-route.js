const app = require("../main").app;
const db = require("../db");
const util = require("util");

app.get("/", async (req, res) =>
{
	req.session.user = await isSessionUserValid(req.session.user);
	res.render("index.hbs", { user: req.session.user });
});

async function isSessionUserValid(user)
{
	if (!user)
		return;
	let getUser = util.promisify(db.getUser);
	try
	{
		return await getUser(user.username, null);
	}
	catch (error)
	{
		return null;
	}
}