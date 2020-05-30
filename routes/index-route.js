const app = require("../main").app;
const db = require("../db");
const util = require("util");
const routeAdminCourses = require("./admin-courses-route.js");

app.get("/", async (req, res) =>
{
	req.session.user = await isSessionUserValid(req.session.user);
	res.render("index.hbs", { user: req.session.user });
});

app.post("/", async (req, res) =>
{
	let action = req.body.action;
	switch (action)
	{
		case "load-available-courses":
		{
			try
			{
				let coursesList = await routeAdminCourses.getAvailableCoursesList();
				res.send({ success: true, coursesList });
				break;
			}
			catch (error)
			{
				res.send(error);
			}
		}
	}
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