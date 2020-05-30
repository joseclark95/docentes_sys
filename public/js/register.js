let usernameInput = document.getElementById("username-input"),
	emailInput = document.getElementById("email-input"),
	passwordStep1Input = document.getElementById("password-step1-input"),
	passwordStep2Input = document.getElementById("password-step2-input"),
	nameInput = document.getElementById("name-input"),
	lastNameInput = document.getElementById("last-name-input"),
	messageParagraph = document.getElementById("message-paragraph"),
	registerButton = document.getElementById("register-button"),
	messageTimer;

registerButton.addEventListener("click", async function(event)
{
	let response = await fetch('/register',
	{
		method: 'POST',
		body: JSON.stringify(
		{
			username: usernameInput.value,
			email: emailInput.value,
			password1: passwordStep1Input.value,
			password2: passwordStep2Input.value,
			name: nameInput.value,
			lastName: lastNameInput.value,
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