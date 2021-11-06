import express from "express";
import { json } from "body-parser";
import { routeHandler } from "./routes/handler";
import { client } from "./services/mongo";

const app = express();
app.use(json());
app.use("/api/", routeHandler);

const PORT = process.env.port || 3000;

app.listen(PORT, async () => {
	console.info(`Server started on port ${PORT}`);
	try {
		await client.connect();
		console.info("Connected to database");
	} catch (error) {
		console.error(error);
	}
});
