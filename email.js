import { templates } from "./templates.js";
import NodeMailer from "nodemailer";

export const mailer = {
	async send(to, from, subject, template, values) {
		// Create the body
		const body = templates.render(template, values);
		console.log("sending this body", body);

		var transporter = NodeMailer.createTransport({
			host: "authsmtp.securemail.pro",
			port: 465,
			secure: true,
			auth: {
				user: "noreply@mistercompliance.it",
				pass: "E-digit_26APAlfa!",
			},
		});

		var mailOptions = {
			from,
			to,
			subject,
			html: body,
		};

		try {
			const info = await transporter.sendMail(mailOptions);
			return info;
		} catch (error) {
			return error;
		}
	},
};
