import express from 'express';
import { router } from "./router.js";
import { templates } from "./templates.js";

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Routing
app.use("/api", router);

// load templates
templates.load();

// Launch the server
app.listen(port, () => {
    console.log("Server is up and running on port %s", port);    
})