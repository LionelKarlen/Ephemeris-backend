import express from "express";
import { getCollection } from "../services/mongo";
import { ObjectId } from "mongodb";
import { handleRequestError } from "../services/util";
import { Engagement } from "ephemeris-common/lib";

const router = express.Router();
const localCollection = "engagement";

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
	let engagement: Engagement = {
		date: req.body["date"],
		engagement_type: req.body["engagement_type"],
		unable: req.body["unable"],
		user_id: req.body["user_id"],
		visitor_number: req.body["visitor_number"],
		visitor_type: req.body["visitor_type"],
	};
	collection.findOneAndUpdate({ _id: new ObjectId(id) }, engagement);
	res.send();
});

router.post("/", (req, res) => {
	const collection = getCollection(localCollection);
	let engagement: Engagement = {
		date: req.body["date"],
		engagement_type: req.body["engagement_type"],
		unable: req.body["unable"],
		user_id: req.body["user_id"],
		visitor_number: req.body["visitor_number"],
		visitor_type: req.body["visitor_type"],
	};
	collection.insertOne(engagement);
	res.end();
});

router.delete("/:id", (req, res) => {
	console.log(req.params);
	const id = req.params.id;
	const collection = getCollection(localCollection);
	collection.findOneAndDelete({ _id: new ObjectId(id) });
	res.end();
});

export { router as engagementRouter };
