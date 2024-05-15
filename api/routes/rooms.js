import express from "express";
import { createRoom, deleteRoom, getRoom, updatedRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create a new hotel
router.post("/:hotelsid", verifyAdmin, createRoom);

//update
router.put("/:id", verifyAdmin, updatedRoom);
//delete
router.delete("/:id", deleteRoom);
//get
router.get("/:id", getRoom);
//get all
router.get("/", getallRoom);

export default router;
