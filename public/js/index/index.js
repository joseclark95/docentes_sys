import { controls } from "./controls.js";
import { request } from "../request.js";
import Modal from "../modal.js";

let loadTableData = async function()
{
	let result = await request('/', 'POST',
	{
		"content-type": "application/json",
		"accept": "application/json"
	},
	{
		action: "load-available-courses",
	});
	if (result.success)
	{
		controls.setTableContents(result.coursesList);
	}
}
loadTableData();