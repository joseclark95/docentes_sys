/**
 * Sends a request to the server a returns a JSON response
 *
 * @export
 * @param {string} url URL of the server 
 * @param {string} method Method of request, eg. GET, POST, etc.
 * @param {object} headers Object with pairs of string keys and values to send as headers
 * @param {*} body Message to send (must be able to be formatted as JSON)
 * @returns {object} Returns object with "success" set as false and "error" with the message error. Otherwise "success" set as true with "message" as the result
 */
export async function request(url, method, headers, body)
{
	try
	{
		let response = await fetch(url,
		{
			method: method,
			body: JSON.stringify(body),
			headers: headers
		});
		if (response.ok)
		{
			if (getContentType(response.headers.get("content-type")) == "application/json;")
				return await response.json();
			return { success: false, message: "The message returned from the server isn't in JSON format" };
		}
	}
	catch (e)
	{
		console.log(e);
	}
	return { success: false, message: "No se pudo establecer la conexión con el servidor, por favor intentalo de nuevo" };
}

function getContentType(header)
{
	return header.split(" ")[0];
}