let messageTimer;

export let controls = {
	createDiv: document.getElementById("create-div"),
	registryNumberInput: document.getElementById("registry-number-input"),
	nameInput: document.getElementById("name-input"),
	typeInput: document.getElementById("type-input"),
	categoryInput: document.getElementById("category-input"),
	instructorInput: document.getElementById("instructor-input"),
	fromDateInput: document.getElementById("from-date-input"),
	toDateInput: document.getElementById("to-date-input"),
	enrollFromDateInput: document.getElementById("enroll-from-date-input"),
	enrollToDateInput: document.getElementById("enroll-to-date-input"),
	addButton: document.getElementById("add-button"),
	showButton: document.getElementById("show-button"),
	cancelButton: document.getElementById("cancel-button"),
	messageParagraph: document.getElementById("message-paragraph"),
	coursesTableBody: document.getElementById("courses-tbody"),
	sendMessage: function(message, element)
	{
		if (messageTimer)
		{
			clearTimeout(messageTimer);
			messageTimer = null;
		}
		if (!element)
			element = this.messageParagraph;
		element.innerHTML = message;
		messageTimer = setTimeout(() =>
		{
			element.innerHTML = "";
		}, 5000);
	},
	clearInputs: function()
	{
		controls.registryNumberInput.value = "";
		controls.nameInput.value = "";
		controls.typeInput.value = "";
		controls.categoryInput.value = "";
		controls.instructorInput.value = "";
		controls.fromDateInput.value = "";
		controls.toDateInput.value = "";
		controls.enrollFromDateInput.value = "";
		controls.enrollToDateInput.value = "";
	}
};