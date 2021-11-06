import express from "express";
import { getCollection } from "../services/mongo";
import type { User } from "ephemeris-common/lib/user";
import {ObjectId} from "mongodb";

const router = express.Router();

router.get("/", (req, res) => {
	const collection = getCollection("user");
	collection.find({}).toArray((err, items) => {
		if (err) {
			res.status(500);
			res.end();
			console.error("Caught exception", err);
		} else {
			res.json(items);
		}
	});
});

router.post("/", (req, res) => {
	const collection = getCollection("user");
	let user: User = {
		name: req.body["name"],
		email: req.body["email"],
		password: req.body["password"],
		deficit: 0,
		id: "",
	};
	collection.insertOne(user);
	res.end();
});

router.delete("/:id", (req, res) => {
	console.log(req.params);
	const id = req.params.id;
	const collection = getCollection("user");
	collection.findOneAndDelete({ _id: new ObjectId(id) });
	res.end();
});

export { router as userRouter };
