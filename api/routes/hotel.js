import express from "express";
import Hotel from "../models/Hotel.js";
import { createHotel, deleteHotel, getHotel, getallHotel, updatedHotel } from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create a new hotel
router.post("/", verifyAdmin, createHotel);

//update
router.put("/:id", verifyAdmin, updatedHotel);
//delete
router.delete("/:id", deleteHotel);
//get
router.get("/:id", getHotel);
//get all
router.get("/", getallHotel);


export default router;
