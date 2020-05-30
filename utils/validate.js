module.exports = {
	// course validations
	isCourseActive,
	setCourseAvailability,
	validateCourseInfo,
	validateCourseDates,
	isCourseIdValid,
	isCourseNameValid,
	isCourseTypeValid,
	isCourseCategoryValid,
	isCourseInstructorNameValid,
	isCourseStartValid,
	isCourseEndValid,
	isCourseEnrollStartValid,
	isCourseEnrollEndValid,

	// user validations
	validateUserInfo,
	isUsernameValid,
	isUserPasswordValid,
	isUserEmailValid,
	isUserNameValid,
	isUserLastNameValid,

	// extra functions
	setError
};

function isCourseActive(course)
{
	let today = Date.now();
	return (today >= course.start && today <= course.end) || (today >= course.enrollStart && today <= course.enrollEnd);
}

function setCourseAvailability(course)
{
	if (isCourseActive(course))
		course.enabled = true;
}

function validateCourseDates(course)
{
	let result = isCourseStartValid(course.start);
	if (!result.success)
		return result;
	result = isCourseEndValid(course.end);
	if (!result.success)
		return result;
	result = isCourseEnrollStartValid(course.enrollStart, course.enrollEnd);
	if (!result.success)
		return result;
	result = isCourseEnrollEndValid(course.enrollStart, course.enrollEnd);
	if (!result.success)
		return result;
	formatDates(course);
	return { success: true };
}

function validateCourseInfo(course)
{
	formatOptionalFields(course, "enrollStart", "enrollEnd");
	let result = isCourseIdValid(course.id);
	if (!result.success)
		return result;
	result = isCourseTypeValid(course.type);
	if (!result.success)
		return result;
	result = isCourseCategoryValid(course.category);
	if (!result.success)
		return result;
	result = isCourseNameValid(course.name);
	if (!result.success)
		return result;
	result = isCourseInstructorNameValid(course.instructorName);
	if (!result.success)
		return result;
	result = isCourseStartValid(course.start);
	if (!result.success)
		return result;
	result = isCourseEndValid(course.end);
	if (!result.success)
		return result;
	result = isCourseEnrollStartValid(course.enrollStart, course.enrollEnd);
	if (!result.success)
		return result;
	result = isCourseEnrollEndValid(course.enrollStart, course.enrollEnd);
	if (!result.success)
		return result;
	formatDates(course);
	return { success: true };
}

function isCourseIdValid(id)
{
	let result = isLengthValid(id, 0, 255,
		"El identificador de registro no puede quedar vacío",
		"El identificador de registro es demasiado largo");
	if (!result.success)
		return result;
	return { success: true };
}

function isCourseNameValid(name)
{
	let result = isLengthValid(name, 0, 255,
		"El nombre de curso no puede quedar vacío",
		"El nombre del curso es demasiado largo");
	if (!result.success)
		return result;
	return { success: true };
}

function isCourseTypeValid(type)
{
	let result = isLengthValid(type, 0, 255,
		"El tipo de curso no puede quedar vacío",
		"El tipo del curso es demasiado largo");
	if (!result.success)
		return result;
	return { success: true };
}

function isCourseCategoryValid(category)
{
	let result = isLengthValid(category, 0, 255,
		"La categoría de curso no puede quedar vacía",
		"La categoría del curso es demasiado larga");
	if (!result.success)
		return result;
	return { success: true };
}

function isCourseInstructorNameValid(instructorName)
{
	let result = isLengthValid(instructorName, 0, 255,
		"El nombre del instructor no puede quedar vacío",
		"El nombre del instructor es demasiado largo");
	if (!result.success)
		return result;
	return { success: true };
}

function isCourseStartValid(start)
{
	let result = isLengthValid(start, 0, 17,
		"La fecha de inicio del curso no puede quedar vacía",
		"La fecha de inicio de curso es demasiado larga");
	if (!result.success)
		return result;
	if (!/^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2}) (\d{2}):(\d{2})$/.test(start))
		return setError("La fecha de inicio del curso ingresada es invalida, " +
			"el formato necesario es el siguiente: yyyy-mm-dd hh:mm");
	if (new Date(start).getDate() == NaN)
		return setError("La fecha de inicio de curso ingresada es invalida, " +
			"el formato necesario es el siguiente: yyyy-mm-dd hh:mm");
	return { success: true };
}

function isCourseEndValid(end)
{
	let result = isLengthValid(end, 0, 17,
		"La fecha de fin del curso no puede quedar vacía",
		"La fecha de fin de curso es demasiado larga");
	if (!result.success)
		return result;
	if (!/^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2}) (\d{2}):(\d{2})$/.test(end))
		return setError("La fecha de fin del curso ingresada es invalida, " +
			"el formato necesario es el siguiente: yyyy-mm-dd hh:mm");
	if (new Date(end).getDate() == NaN)
		return setError("La fecha de fin de curso ingresada es invalida, " +
			"el formato necesario es el siguiente: yyyy-mm-dd hh:mm");
	return { success: true };
}

function isCourseEnrollStartValid(enrollStart, enrollEnd)
{
	if (enrollStart && enrollStart.length)
	{
		if (!/^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2}) (\d{2}):(\d{2})$/.test(enrollStart))
			return setError("La fecha de inicio del periodo de inscripción ingresada es invalida, " +
				"el formato necesario es el siguiente: yyyy-mm-dd hh:mm");
		if (!enrollEnd.length)
			return setError("Se debe proporcionar una fecha de fin para el periodo de inscripción");
		if (enrollStart.length >= 17)
			return setError("La fecha de inicio del periodo de inscripción es demasiado larga");
		if (new Date(enrollStart).getDate() == NaN)
			return setError("La fecha de inicio del periodo de inscripción ingresada es invalida, " +
				"el formato necesario es el siguiente: yyyy-mm-dd hh:mm");
	}
	return { success: true };
}

function isCourseEnrollEndValid(enrollStart, enrollEnd)
{
	if (enrollEnd)
	{
		if (!/^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2}) (\d{2}):(\d{2})$/.test(enrollEnd))
			return setError("La fecha de fin del periodo de inscripción ingresada es invalida, " +
				"el formato necesario es el siguiente: yyyy-mm-dd hh:mm");
		if (!enrollStart.length)
			return setError("Se debe proporcionar una fecha de inicio para el periodo de inscripción");
		if (enrollEnd.length >= 17)
			return setError("La fecha de fin del periodo de inscripción es demasiado larga");
		if (new Date(enrollEnd).getDate() == NaN)
			return setError("La fecha de fin del periodo de inscripción ingresada es invalida, " +
				"el formato necesario es el siguiente: yyyy-mm-dd hh:mm");
	}
	return { success: true };
}

function validateUserInfo(user)
{
	let result = isUsernameValid(user.username);
	if (!result.success)
		return result;
	result = isUserPasswordValid(user.password1, user.password2);
	if (!result.success)
		return result;
	result = isUserEmailValid(user.email);
	if (!result.success)
		return result;
	result = isUserNameValid(user.name);
	if (!result.success)
		return result;
	result = isUserLastNameValid(user.lastName);
	if (!result.success)
		return result;
	return { success: true };
}

function isUsernameValid(username)
{
	let result = isLengthValid(username, 7, 30,
		"El nombre de usuario tiene contener de 8 a 30 caracteres",
		"El nombre de usuario tiene contener de 8 a 30 caracteres");
	if (!result.success)
		return result;
	if (!/^[\p{Letter}_\d]+$/u.test(username))
		return setError("El nombre de usuario ingresado contiene caracteres inválidos");
	return { success: true };
}

function isUserPasswordValid(password1, password2)
{
	let result = isLengthValid(password1, 0, 255,
		"La contraseña no puede estar vacía",
		"La contraseña es demasiado larga");
	if (!result.success)
		return result;
	if (!/^[\p{Letter}_\d]+$/u.test(password1))
		return setError("La contraseña ingresada contiene caracteres inválidos");
	if (password1.search(/[a-zA-Z]/) == -1)
		return setError("La contraseña debe contener al menos una letra");
	if (password1.search(/\d/) == -1)
		return setError("La contraseña debe contener al menos un dígito");
	if (password1.length <= 7)
		return setError("La contraseña debe contener al menos 8 caracteres");
	if (password2 != null)
	{
		if (password1 != password2)
			return setError("Las dos contraseñas ingresadas no concuerdan");
	}
	return { success: true };
}

function isUserEmailValid(email)
{
	let result = isLengthValid(email, 0, 255,
		"El correo no puede quedar vacío",
		"El correo ingresado es demasiado largo");
	if (!result.success)
		return result;
	let emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (!emailRegExp.test(email))
		return setError("Se debe ingresar un correo valido");
	return { success: true };
}

function isUserNameValid(name)
{
	let result = isLengthValid(name, 0, 255,
		"Los nombres no pueden quedar vacíos",
		"Los nombres ingresados son demasiado largos");
	if (!result.success)
		return result;
	return { success: true };
}

function isUserLastNameValid(lastName)
{
	let result = isLengthValid(lastName, 0, 255,
		"Los apellidos no pueden quedar vacíos",
		"Los apellidos ingresados son demasiado largos");
	if (!result.success)
		return result;
	return { success: true };
}

function formatDates(course)
{
	course.start = new Date(course.start);
	course.end = new Date(course.end);
	if (course.enrollStart)
		course.enrollStart = new Date(course.enrollStart);
	if (course.enrollEnd)
		course.enrollEnd = new Date(course.enrollEnd);
}

function formatOptionalFields(object, ...fields)
{
	for (let x = 0; x < fields.length; x++)
	{
		if (!object[fields[x]])
			object[fields[x]] = null;
	}
}

function isLengthValid(field, minLength, maxLength, messageWhenEmpty, messageWhenLong)
{
	if (field.length <= minLength)
		return setError(messageWhenEmpty);
	if (field.length >= maxLength)
		return setError(messageWhenLong);
	return { success: true };
}

function setError(message, logMessage)
{
	let date = new Date();
	let dateStr = `[${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}]`,
		logStr = !logMessage ? "" : "\n\t" + logMessage;
	console.log(`${dateStr}: ${message}${logStr}`);
	return { success: false, error: message, logMessage: logMessage };
}