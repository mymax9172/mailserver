import express from "express";
import { templates } from "./templates.js";
import { mailer } from "./email.js";

const router = express.Router();

// Path: /api
// Return the status of the server
router.get("/", (req, res) => {
	res.send("MailServer is up and running");
});

// Path: /api/template
// Store the template
router.post("/template", (req, res) => {
	const body = req.body;
	res.send("Storing template named = " + body.name);
	templates.storeTemplate(body.name, body.content);

	// Save it locally
	templates.save();
});

// Path: /api/render
// Render a template
router.post("/render", (req, res) => {
	const body = req.body;
	res.send(templates.render(body.name, body.values));
});

// Path: /api/send
// Send an email
router.post("/send", async (req, res) => {
	console.log("/send...");
	const body = req.body;
	const result = await mailer.send(
		body.to,
		body.from,
		body.subject,
		body.template,
		body.values
	);
	console.log(result);
	res.send(result);
});

export { router };
