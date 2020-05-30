/**
 * Returns a string representation of the given Date
 *
 * @export
 * @param {Date} date date object to format
 * @param {boolean} namedDay if true, returns with a named week day
 * @returns {string}
 */
export function formatDate(date, weekDay)
{
	let weekDayString = " ";
	if (weekDay)
		weekDayString = ", " + getWeekDay(date.getDay()) + ". ";
	return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-` +
		`${("0" + date.getDate()).slice(-2)}${weekDayString}` +
		`${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
};

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