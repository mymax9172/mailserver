import express from "express";
import cors from "cors";
import { router } from "./router.js";
import { templates } from "./templates.js";

const app = express();
const port = 3000;

var corsOptions = {
	origin: /mistercompliance\.it$/,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routing
app.use("/api", router);

// load templates
templates.load();

// Launch the server
app.listen(port, () => {
	console.log("Server is up and running on port %s", port);
});
