import express from "express";
import { getCollection } from "../services/mongo";
import { ObjectId } from "mongodb";
import { handleRequestError } from "../services/util";
import {
	Archive,
	ArchiveCache,
	Engagement,
	uuid,
	VisitorType,
} from "ephemeris-common/lib";

const router = express.Router();
const localCollection = "archive";

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

router.get("/:year", (req, res) => {
	const year = req.params.year;
	const collection = getCollection(localCollection);
	collection.find({ year: year }).toArray((err, items) => {
		if (err) {
			handleRequestError(err, res);
		} else {
			res.json(items);
		}
	});
});

// TODO
// router.put("/:id", (req, res) => {
// 	const id = req.params.id;
// 	const collection = getCollection(localCollection);
// 	let archive: Archive = {
// 		year: req.body["year"],
// 		engagements: req.body[""],
// 		regular: req.body[""],
// 		sunlab: req.body[""],
// 	};
// 	collection.findOneAndUpdate({ _id: new ObjectId(id) }, archive);
// 	res.send();
// });

router.post("/", (req, res) => {
	const collection = getCollection(localCollection);
	const emptyArchiveCache: ArchiveCache = {
		engagements: 0,
		engagements_per_user: new Map<uuid, number>(), //STUB
		total_visitors: 0,
		visitors_per_type: new Map<VisitorType, number>(), //STUB
	};
	const emptyEngagements: Engagement[] = [];
	let archive: Archive = {
		year: new Date(Date.now()).getFullYear(),
		engagements: emptyEngagements,
		regular: emptyArchiveCache,
		sunlab: emptyArchiveCache,
	};
	collection.insertOne(archive);
	res.end();
});

router.delete("/:id", (req, res) => {
	console.log(req.params);
	const id = req.params.id;
	const collection = getCollection(localCollection);
	collection.findOneAndDelete({ _id: new ObjectId(id) });
	res.end();
});

export { router as archiveRouter };
