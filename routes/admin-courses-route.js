const app = require("../main").app;
const db = require("../db");
const util = require("util");
const validate = require("../utils/validate");

module.exports = {
	getCoursesList,
	getAvailableCoursesList
}

app.get("/admin-courses", async (req, res) =>
{
	let user = req.session.user;
	if (!user || !user.admin)
	{
		res.render("error.hbs");
		return;
	}
	try
	{
		let coursesList = await getCoursesList();
		res.render("admin-courses.hbs", { coursesList: coursesList });
	}
	catch (error)
	{
		res.send(error);
	}
});

app.post("/admin-courses", async (req, res) =>
{
	let action = req.body.action;
	switch (action)
	{
		case "add-course":
		{
			let getCourse = util.promisify(db.getCourse),
				addCourse = util.promisify(db.addCourse),
				course = req.body;
			try
			{
				let result = await getCourse(course);
				if (result)
				{
					res.send(validate.setError(`Ya existe un curso con el numero de registro '${course.id}'`));
					return;
				}
				result = await addCourse(course);
				res.send({ success: true, course: result });
				return;
			}
			catch (error)
			{
				res.send(error);
			}
		}
		case "get-config-data":
		{
			let getCourse = util.promisify(db.getCourse),
				courseId = req.body.courseId;
			try
			{
				let result = await getCourse({ id: courseId });
				if (!result)
				{
					res.send(validate.setError(`No se pudo encontrar el curso con el identificador '${courseId}'`));
					return;
				}
				res.send({ success: true, course: result });
				return;
			}
			catch (error)
			{
				res.send(error);
			}
			break;
		}
		case "save-config-data":
		{
			let updateCourseConfig = util.promisify(db.updateCourseConfig),
				course = req.body.course,
				updatedCourse = {
					start: req.body.newStartDate,
					end: req.body.newEndDate,
					enrollStart: req.body.newEnrollStartDate,
					enrollEnd: req.body.newEnrollEndDate,
					enabled: req.body.enabled
				};
			try
			{
				let result = await updateCourseConfig(course, updatedCourse);
				res.send({ success: true, course: result });
				return;
			}
			catch (error)
			{
				res.send(error);
			}
			break;
		}
		case "enable-course":
		{
			let course = req.body.course,
				updatedCourse = {
					start: req.body.newStartDate,
					end: req.body.newEndDate,
					enrollStart: req.body.newEnrollStartDate,
					enrollEnd: req.body.newEnrollEndDate,
				};
			let getCourse = util.promisify(db.getCourse);
			try
			{
				let result = await getCourse(course);
				if (!result)
				{
					res.send(validate.setError(`No se pudo encontrar el curso con el identificador '${courseId}'`));
					return;
				}
				if (result.enabled)
				{
					res.send(validate.setError(`Este curso ya esta habilitado`));
					return;
				}
				result = validate.validateCourseDates(updatedCourse);
				if (!result.success)
				{
					res.send(result);
					return;
				}
				if (!validate.isCourseActive(updatedCourse))
				{
					res.send(validate.setError(`La fecha de fin de curso ya paso. Ingrese una fecha próxima para poder habilitarlo`));
					return;
				}
				res.send({ success: true });
			}
			catch (error)
			{
				res.send(error);
			}
			break;
		}
	}
});

async function getCoursesList()
{
	try
	{
		let getAllCourses = util.promisify(db.getAllCourses);
		return await getAllCourses();
	}
	catch (error)
	{
		return error;
	}
}

async function getAvailableCoursesList()
{
	try
	{
		let getAllCourses = util.promisify(db.getAllCourses);
		let coursesList = await getAllCourses(),
			availableCourses = [];
		for (const course of coursesList)
			if (course.enabled)
				availableCourses.push(course);
		return availableCourses;
	}
	catch (error)
	{
		return error;
	}
}