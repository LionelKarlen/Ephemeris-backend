import express from "express";
import { engagementRouter } from "./engagement";
import { userRouter } from "./user";

const router = express.Router();

router.use("/user", userRouter);
router.use("/engagement", engagementRouter);

export { router as routeHandler };
