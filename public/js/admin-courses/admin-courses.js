import { controls } from "./controls.js";
import { request } from "./request.js";
import Modal from "../modal.js";
import { formatDate } from "../utils.js"

let configCourseButtons = document.querySelectorAll(".config-course-button");
for (const button of configCourseButtons)
	setConfigurationButton(button);

controls.addButton.addEventListener("click", async (event) =>
{
	let result = await request('/admin-courses', 'POST',
	{
		"content-type": "application/json",
		"accept": "application/json"
	},
	{
		action: "add-course",
		id: controls.registryNumberInput.value,
		name: controls.nameInput.value,
		type: controls.typeInput.value,
		category: controls.categoryInput.value,
		instructorName: controls.instructorInput.value,
		start: controls.fromDateInput.value,
		end: controls.toDateInput.value,
		enrollStart: controls.enrollFromDateInput.value,
		enrollEnd: controls.enrollToDateInput.value
	});
	if (result.success)
	{
		controls.clearInputs();
		addCourseHTMLRow(result.course);
		controls.sendMessage("Curso añadido exitosamente");
		controls.modal.close();
		return;
	}
	controls.sendMessage(result.error);
});

controls.cancelButton.addEventListener("click", function(event)
{
	controls.modal.close();
});

controls.showButton.addEventListener("click", (event) =>
{
	let modal = new Modal();
	modal.background = document.querySelector("#add-course-modal-background");
	modal.content = document.querySelector("#add-course-modal-content");
	modal.header = document.querySelector("#add-course-modal-header");
	modal.body = document.querySelector("#add-course-modal-body");
	modal.footer = document.querySelector("#add-course-modal-footer");

	controls.modal = modal;
	modal.open(document.querySelector("body"));
});

function setConfigurationButton(button)
{
	button.addEventListener("click", async function(event)
	{
		let modal = Modal.build("Configuración del curso", null, document.createElement("p"));
		modal.open(document.querySelector("body"));

		let result = await request('/admin-courses', 'POST',
		{
			"content-type": "application/json",
			"accept": "application/json"
		},
		{
			action: "get-config-data",
			courseId: button.dataset.courseId
		});
		if (result.success)
		{
			modal.body.append(getCourseHTMLConfig(result.course, modal));
			return;
		}
		modal.body.innerHTML = "No se pudo obtener la información del servidor. Por favor vuelva a intentar";
	});
}

function addCourseHTMLRow(course)
{
	let tableRow = document.createElement("tr");
	for (const field in course)
	{
		if (field == "action" || field == "enabled")
			continue;
		let tableCell = document.createElement("td");
		tableRow.append(tableCell);
		if (field == "start" || field == "end" || field == "enrollStart" || field == "enrollEnd")
		{
			course[field] = new Date(course[field]);
			tableCell.innerHTML = formatDate(course[field], true);
			continue;
		}
		if (course[field])
		{
			tableCell.innerHTML = `${course[field]}`;
			continue;
		}
		tableCell.innerHTML = `Sin asignar`;
	}
	tableRow.append(getCourseHTMLOptions(course));
	controls.coursesTableBody.prepend(tableRow);
}

function getCourseHTMLOptions(course)
{
	let tableCell = document.createElement("td"),
		configButton = document.createElement("button");
	configButton.innerHTML = "Configurar";
	configButton.setAttribute("data-course-id", course.id);
	configButton.className = "config-course-button";

	setConfigurationButton(configButton);
	tableCell.append(configButton);
	return tableCell;
}

function getCourseHTMLConfig(course, modalParent)
{
	let mainDiv = document.createElement("div"),
		nameDiv = document.createElement("div"),
		coursePeriodDiv = document.createElement("div"),
		periodParagraph = document.createElement("p"),
		startLabel = document.createElement("label"),
		startInput = document.createElement("input"),
		endLabel = document.createElement("label"),
		endInput = document.createElement("input"),
		courseEnrollDiv = document.createElement("div"),
		enrollParagraph = document.createElement("p"),
		enrollStartLabel = document.createElement("label"),
		enrollStartInput = document.createElement("input"),
		enrollEndLabel = document.createElement("label"),
		enrollEndInput = document.createElement("input"),
		statusButtonsDiv = document.createElement("div"),
		enableButton = document.createElement("button"),
		disableButton = document.createElement("button"),
		changesButtonsDiv = document.createElement("div"),
		saveButton = document.createElement("button"),
		cancelButton = document.createElement("button");

	course.start = new Date(course.start);
	course.end = new Date(course.end);

	nameDiv.innerHTML = `${course.id} — ${course.name}`;

	periodParagraph.innerHTML = "Periodo del curso:"
	startInput.id = "config-start-input";
	startInput.value = formatDate(course.start);
	startLabel.htmlFor = "config-start-input";
	startLabel.innerHTML = "Desde:";

	endInput.id = "config-end-input";
	endInput.value = formatDate(course.end);
	endLabel.htmlFor = "config-end-input";
	endLabel.innerHTML = "Hasta:";
	coursePeriodDiv.append(periodParagraph, startLabel, startInput, endLabel, endInput);

	enrollParagraph.innerHTML = "Periodo de inscripción:"
	enrollStartInput.id = "config-enroll-start-input";
	if (course.enrollStart)
	{
		course.enrollStart = new Date(course.enrollStart);
		enrollStartInput.value = formatDate(course.enrollStart);
	}
	enrollStartLabel.htmlFor = "config-enroll-start-input";
	enrollStartLabel.innerHTML = "Desde:";

	enrollEndInput.id = "config-enroll-end-input";
	if (course.enrollEnd)
	{
		course.enrollEnd = new Date(course.enrollEnd);
		enrollEndInput.value = formatDate(course.enrollEnd);;
	}
	enrollEndLabel.htmlFor = "config-enroll-end-input";
	enrollEndLabel.innerHTML = "Hasta:";
	courseEnrollDiv.append(enrollParagraph, enrollStartLabel, enrollStartInput, enrollEndLabel, enrollEndInput);

	enableButton.innerHTML = "Habilitar";
	setCourseConfigEnableButton(enableButton, course, modalParent, enableButton, disableButton, startInput,
		endInput, enrollStartInput, enrollEndInput);
	disableButton.innerHTML = "Deshabilitar";
	setCourseConfigDisableButton(disableButton, course, enableButton, disableButton);
	statusButtonsDiv.append(enableButton, disableButton);

	saveButton.innerHTML = "Guardar cambios";
	setCourseConfigSaveButton(saveButton, course, modalParent, startInput, endInput, enrollStartInput, enrollEndInput);
	cancelButton.innerHTML = "Cancelar";
	setCourseConfigCancelButton(cancelButton, modalParent);
	changesButtonsDiv.append(saveButton, cancelButton);

	mainDiv.append(nameDiv, coursePeriodDiv, courseEnrollDiv, statusButtonsDiv, changesButtonsDiv);
	return mainDiv;
}

function setCourseConfigEnableButton(button, course, modal, enableButton, disableButton, startDate, endDate,
	enrollStartDate, enrollEndDate)
{
	if (course.enabled)
		button.disabled = true;
	button.addEventListener("click", async function(event)
	{
		let result = await request('/admin-courses', 'POST',
		{
			"content-type": "application/json",
			"accept": "application/json"
		},
		{
			action: "enable-course",
			course: course,
			newStartDate: startDate.value,
			newEndDate: endDate.value,
			newEnrollStartDate: enrollStartDate.value,
			newEnrollEndDate: enrollEndDate.value,
		});
		if (result.success)
		{
			course.enabled = true;
			disableButton.disabled = false;
			enableButton.disabled = true;
			return;
		}
		controls.sendMessage(result.error, modal.footer.children[0]);
	});
}

function setCourseConfigDisableButton(button, course, enableButton, disableButton)
{
	button.addEventListener("click", function(event)
	{
		course.enabled = false;
		disableButton.disabled = true;
		enableButton.disabled = false;
	});
}

function setCourseConfigSaveButton(button, course, modal, startDate, endDate, enrollStartDate, enrollEndDate)
{
	button.addEventListener("click", async function(event)
	{
		let result = await request('/admin-courses', 'POST',
		{
			"content-type": "application/json",
			"accept": "application/json"
		},
		{
			action: "save-config-data",
			course: course,
			newStartDate: startDate.value,
			newEndDate: endDate.value,
			newEnrollStartDate: enrollStartDate.value,
			newEnrollEndDate: enrollEndDate.value,
			enabled: course.enabled
		});
		if (result.success)
		{
			course = result.course;
			modal.close(true);
			return;
		}
		controls.sendMessage(result.error, modal.footer.children[0]);
	});
}

function setCourseConfigCancelButton(button, modal)
{
	button.addEventListener("click", function(event)
	{
		modal.close(true);
	});
}