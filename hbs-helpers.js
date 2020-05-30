const hbs = require("hbs");
const db = require("./db");
const util = require("util");

hbs.registerHelper("getAccountStatus", getAccountStatus);
hbs.registerHelper("getAccountHref", getAccountHref);
hbs.registerHelper("getCurrentYear", getCurrentYear);
hbs.registerHelper("getCoursesList", getCoursesList);

function getAccountStatus(user)
{
	if (!user)
		return "Ingresar";
	return `Mi cuenta — ${user.name} ${user.lastName}`;
};

function getAccountHref(user)
{
	if (!user)
		return "/login";
	return `/account/${user.username}`;
};

function getCurrentYear()
{
	return new Date().getFullYear();
}

function getCoursesList(coursesList)
{
	if (coursesList != null)
	{
		let html = "";
		for (const course of coursesList)
			html += getCourseHTMLRow(course);
		return html;
	}
}

function getCourseHTMLRow(course)
{
	let rowHTML = "<tr>";
	for (const field in course)
	{
		if (field == "enabled")
			continue;
		if (course[field] instanceof Date)
		{
			rowHTML += `<td>${course[field].getFullYear()}-${("0" + (course[field].getMonth() + 1)).slice(-2)}-` +
				`${("0" + course[field].getDate()).slice(-2)}, ${getWeekDay(course[field].getDay())}. ` +
				`${("0" + course[field].getHours()).slice(-2)}:${("0" + course[field].getMinutes()).slice(-2)}</td>`;
			continue;
		}
		if (course[field])
		{
			rowHTML += `<td>${course[field]}</td>`;
			continue;
		}
		rowHTML += `<td>Sin asignar</td>`;
	}
	rowHTML += getCourseHTMLOptions(course);
	return rowHTML += "</tr>"
}

function getCourseHTMLOptions(course)
{
	return `<td>${getCourseHTMLButton("Configurar", course.id, "config-course-button")}</td>`;
}

function getCourseHTMLButton(buttonText, courseId, className)
{
	return `<button data-course-id="${courseId}" class="${className}">${buttonText}</button>`;
}

function getWeekDay(day)
{
	switch (day)
	{
		case 0:
			return "Lunes";
		case 1:
			return "Martes";
		case 2:
			return "Miércoles";
		case 3:
			return "Jueves";
		case 4:
			return "Viernes";
		case 5:
			return "Sábado";
		case 6:
			return "Domingo";
	}
}