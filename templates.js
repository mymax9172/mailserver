import pug from "pug";
import fs from "fs";

export const templates = {
	templates: {},
	compiledTemplates: {},

	storeTemplate(name, body) {
		this.templates[name] = body;
		this.compiledTemplates[name] = pug.compile(body);
	},

	render(name, values) {
		if (!this.compiledTemplates.hasOwnProperty(name)) {
			if (!this.templates.hasOwnProperty(name))
				throw new Error("Template " + name + " does not exist");
			else this.compiledTemplates[name] = pug.compile(this.templates[name]);
		}

		const compiledFunction = this.compiledTemplates[name];
		return compiledFunction(values);
	},

	save() {
		fs.writeFileSync("./templates.json", JSON.stringify(this.templates));
	},

	load() {
		if (fs.existsSync("./templates.json")) {
			console.log("loading file...");
			const content = fs.readFileSync("./templates.json");
			this.templates = JSON.parse(content);

			// TODO parsing...
			const names = Object.keys(this.templates);
			names.forEach((name) => {
				console.log("compiling ..." + name);
				this.compiledTemplates[name] = pug.compile(this.templates[name]);
			});
		} else {
			this.templates = {};
		}
	},
};
