import pug from "pug";
import fs from "fs";

export const templates = {
	templates: {},
	compiledTemplates: {},

	storeTemplate(name, body) {
		this.templates[name] = body;
		this.compiledTemplates[name] = pug.compile(body);
	},

	// renderStatic(name, values) {
	// 	if (!this.compiledTemplates.hasOwnProperty(name)) {
	// 		const filename = "./templates/" + name + ".pug";
	// 		if (!fs.existsSync(filename))
	// 			throw new Error("Static template " + name + " does not exist");
	// 		else {
	// 			const content = fs.readFileSync(filename);
	// 			this.compiledTemplates[name] = pug.compile(content);
	// 		}
	// 	}

	// 	const compiledFunction = this.compiledTemplates[name];
	// 	return compiledFunction(values);
	// },

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
		// Read static templates (if any)
		const fileList = fs.readdirSync("./templates");
		console.log("loading /templates folder...", fileList);
		for (const file of fileList) {
			const filename = `./templates/${file}`;
			const content = fs.readFileSync(filename);
			const name = file.split(".")[0];
			console.log("compiling ..." + name);
			this.compiledTemplates[name] = pug.compile(content);
		}

		// Read dynamic templates (if any)
		if (fs.existsSync("./templates.json")) {
			console.log("loading templates.json...");
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
