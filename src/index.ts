import express from "express";
import { json } from "body-parser";
import { userRouter } from "./routes/user";
import { routeHandler } from "./routes/handler";

const app = express();
app.use(json());
app.use('/api/', routeHandler);

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
