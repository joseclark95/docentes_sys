let loginButton = document.getElementById("login-button"),
	usernameInput = document.getElementById("username-input"),
	passwordInput = document.getElementById("password-input"),
	messageParagraph = document.getElementById("message-paragraph"),
	messageTimer;

loginButton.addEventListener("click", async function(event)
{
	let response = await fetch('/login',
	{
		method: 'POST',
		body: JSON.stringify(
		{
			username: usernameInput.value,
			password: passwordInput.value
		}),
		headers:
		{
			"content-type": "application/json",
			"accept": "application/json"
		}
	});
	if (response.ok)
	{
		let contentType = getContentType(response.headers.get("content-type"));
		if (contentType == "application/json;")
		{
			let result = await response.json();
			if (!result.success)
			{
				sendMessage(result.error);
				return;
			}
			location.assign(location.origin);
		}
		return;
	}
	sendMessage("No se pudo establecer una conexión con el servidor, por favor intentalo de nuevo");
});

function sendMessage(message)
{
	if (messageTimer)
	{
		clearTimeout(messageTimer);
		messageTimer = null;
	}
	messageParagraph.innerHTML = message;
	messageTimer = setTimeout(() =>
	{
		messageParagraph.innerHTML = "";
	}, 5000);
}

function getContentType(header)
{
	return header.split(" ")[0];
}