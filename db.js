const mysql = require("mysql");
const validate = require("./utils/validate");

exports.connectionOptions = {
	host: 'localhost',
	port: 3306,
	user: 'docentes_sys_admin',
	password: 'docentes_sys_admin',
	database: 'docentes_sys'
};

const connection = mysql.createConnection(exports.connectionOptions);
connection.connect((error) =>
{
	if (error)
	{
		validate.setError(`Error connecting to database: ${error.stack}`);
		return;
	}
	console.log('Connected to database as id: ' + connection.threadId);
});
exports.connection;

exports.getUser = (username, password, callback) =>
{
	if (username != "admin")
	{
		let result = validate.isUsernameValid(username);
		if (!result.success)
		{
			callback(result);
			return;
		}
		if (password != null)
		{
			result = validate.isUserPasswordValid(password, null);
			if (!result.success)
			{
				callback(result);
				return;
			}
		}
	}

	connection.query('SELECT * FROM user WHERE username = ?', [username], function(error, results, fields)
	{
		let user = null;
		if (error)
		{
			callback(validate.setError("No se pudo establecer la conexión con el servidor, por favor intentalo de nuevo", error.stack));
			return;
		}
		if (!results.length)
		{
			callback(null, null);
			return;
		}
		user = results[0];
		if (password != null)
		{
			if (user.password != password)
			{
				callback(validate.setError("La contraseña proporcionada es incorrecta"));
				return;
			}
		}
		callback(null, user);
	});
};

exports.addUser = (user, callback) =>
{
	let result = validate.validateUserInfo(user);
	if (!result.success)
	{
		callback(result);
		return;
	}

	connection.query('INSERT INTO user VALUES (?, ?, ?, ?, ?, ?)',
		[user.username, user.password1, user.name, user.lastName, 0, user.email],
		function(error, results, fields)
		{
			if (error)
			{
				callback(validate.setError("No se pudo establecer la conexión con el servidor, por favor intentalo de nuevo", error.stack));
				return;
			}
			callback(null, undefined);
		}
	);
};

exports.addCourse = (course, callback) =>
{
	let result = validate.validateCourseInfo(course);
	if (!result.success)
	{
		callback(result);
		return;
	}
	validate.setCourseAvailability(course);
	connection.query('INSERT INTO course VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		[course.id, course.name, course.type, course.category, course.instructorName, course.start, course.end,
			course.enrollStart, course.enrollEnd, course.enabled
		],
		function(error, results, fields)
		{
			if (error)
			{
				callback(validate.setError("No se pudo establecer la conexión con el servidor, por favor intentalo de nuevo", error.stack));
				return;
			}
			callback(null, course);
		}
	);
};

exports.getCourse = (course, callback) =>
{
	connection.query('SELECT * FROM course WHERE id = ?', [course.id], function(error, results, fields)
	{
		if (error)
		{
			callback(validate.setError("No se pudo establecer la conexión con el servidor, por favor intentalo de nuevo", error.stack));
			return;
		}
		if (!results.length)
		{
			callback(null, null);
			return;
		}
		callback(null, results[0]);
	});
};

exports.getAllCourses = (callback) =>
{
	connection.query('SELECT * FROM course', function(error, results, fields)
	{
		if (error)
		{
			callback(validate.setError("No se pudo establecer la conexión con el servidor, por favor intentalo de nuevo", error.stack));
			return;
		}
		if (!results.length)
		{
			callback(null, null);
			return;
		}
		callback(null, results);
	});
};

exports.updateCourseConfig = (course, updatedCourse, callback) =>
{
	let result = validate.validateCourseDates(updatedCourse);
	if (!result.success)
	{
		callback(result);
		return;
	}

	connection.query('UPDATE course SET `start` = ?, `end` = ?, `enrollStart` = ?, `enrollEnd` = ?, `enabled` = ? WHERE `id` = ?',
		[updatedCourse.start, updatedCourse.end, updatedCourse.enrollStart, updatedCourse.enrollEnd, updatedCourse.enabled, course.id],
		function(error, results, fields)
		{
			if (error)
			{
				callback(validate.setError("No se pudo establecer la conexión con el servidor, por favor intentalo de nuevo", error.stack));
				return;
			}
			course.start = updatedCourse.start;
			course.end = updatedCourse.end;
			course.enrollStart = updatedCourse.enrollStart;
			course.enrollEnd = updatedCourse.enrollEnd;
			course.enabled = updatedCourse.enabled;
			callback(null, course);
		}
	);
};