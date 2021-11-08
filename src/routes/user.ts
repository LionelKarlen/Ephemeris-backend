import express from "express";
import { getCollection } from "../services/mongo";
import type { User } from "ephemeris-common/lib";
import { ObjectId } from "mongodb";
import { handleRequestError } from "../services/util";

const router = express.Router();
const localCollection = "user";

router.get("/", (req, res) => {
	const collection = getCollection(localCollection);
	collection.find({}).toArray((err, items) => {
		if (err) {
			handleRequestError(err, res);
		} else {
			res.json(items);
		}
	});
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const collection = getCollection(localCollection);
	collection.find({ _id: new ObjectId(id) }).toArray((err, items) => {
		if (err) {
			handleRequestError(err, res);
		} else {
			res.json(items);
		}
	});
});

router.put("/:id", (req, res) => {
	const id = req.params.id;
	const collection = getCollection(localCollection);
	let user: User = {
		name: req.body["name"],
		email: req.body["email"],
		password: req.body["password"],
		deficit: 0,
	};
	collection.findOneAndUpdate({ _id: new ObjectId(id) }, user);
	res.send();
});

router.post("/", (req, res) => {
	//TODO: add to **active** Archive cache maps
	const collection = getCollection(localCollection);
	let user: User = {
		name: req.body["name"],
		email: req.body["email"],
		password: req.body["password"],
		deficit: 0,
	};
	collection.insertOne(user);
	res.end();
});

router.delete("/:id", (req, res) => {
	console.log(req.params);
	const id = req.params.id;
	const collection = getCollection(localCollection);
	collection.findOneAndDelete({ _id: new ObjectId(id) });
	res.end();
});

export { router as userRouter };
