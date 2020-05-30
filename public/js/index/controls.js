import { formatDate } from "../utils.js"

export let controls = {
	courseTableBody: document.getElementById("courses-tbody"),
	setTableContents: function(coursesList)
	{
		for (const course of coursesList)
		{
			let tableRow = document.createElement("tr"),
				tableCells = [];

			tableCells[0] = document.createElement("td");
			tableCells[0].innerHTML = course.name;
			tableCells[1] = document.createElement("td");
			tableCells[1].innerHTML = course.instructorName;
			tableCells[2] = document.createElement("td");
			course.start = new Date(course.start);
			tableCells[2].innerHTML = formatDate(course.start);
			tableCells[3] = document.createElement("td");
			course.end = new Date(course.end);
			tableCells[3].innerHTML = formatDate(course.end);
			tableCells[4] = document.createElement("td");
			tableCells[4].innerHTML = "Sin asignar";
			if (course.enrollStart)
			{
				course.enrollStart = new Date(course.enrollStart);
				tableCells[4].innerHTML = formatDate(course.enrollStart)
			}
			tableCells[5] = document.createElement("td");
			tableCells[5].innerHTML = "Sin asignar";
			if (course.enrollEnd)
			{
				course.enrollEnd = new Date(course.enrollEnd);
				tableCells[5].innerHTML = formatDate(course.enrollEnd)
			}
			tableCells[6] = document.createElement("td");
			let registerButton = document.createElement("button");
			registerButton.innerHTML = "Inscribirse";
			tableCells[6].append(registerButton);

			for (const cell of tableCells)
				tableRow.append(cell);
			this.courseTableBody.append(tableRow);
		}
	}
}