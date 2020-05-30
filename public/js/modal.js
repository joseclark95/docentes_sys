export default class Modal
{

	/**
	 * @memberof Modal
	 * @type {Element}
	 */
	parent
	/**
	 * @memberof Modal
	 * @type {HTMLDivElement}
	 */
	background
	/**
	 * @memberof Modal
	 * @type {HTMLDivElement}
	 */
	content
	/**
	 * @memberof Modal
	 * @type {HTMLDivElement}
	 */
	header
	/**
	 * @memberof Modal
	 * @type {HTMLDivElement}
	 */
	body
	/**
	 * @memberof Modal
	 * @type {HTMLDivElement}
	 */
	footer

	/**
	 * Opens the modal
	 *
	 * @param {Element} parent Receives a parent element to be added as children
	 * @memberof Modal
	 */
	open(parent)
	{
		this.parent = parent;
		parent.append(this.background);
		this.background.style.display = "block";
	}

	close(remove)
	{
		if (this.parent)
		{
			this.background.style.display = "none";
			if (remove)
				this.background.remove();
		}
	}
}

/**
 *
 * @param {HTMLDivElement} header
 * @param {HTMLDivElement} body
 * @param {HTMLDivElement} footer
 * @returns {Modal}
 */
function build(header, body, footer)
{
	let modal = new Modal();
	modal.background = document.createElement("div");
	modal.background.className = "modal-background";

	modal.content = document.createElement("div");
	modal.content.className = "modal-content";

	modal.header = document.createElement("div");
	modal.header.className = "header";
	if (header)
		modal.header.append(header);

	modal.body = document.createElement("div");
	modal.body.className = "body";
	if (body)
		modal.body.append(body);

	modal.footer = document.createElement("div");
	modal.footer.className = "footer";
	if (footer)
		modal.footer.append(footer);

	modal.content.append(modal.header, modal.body, modal.footer);
	modal.background.append(modal.content);
	return modal;
}
Modal.build = build;