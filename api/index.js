import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelRoute from "./routes/hotel.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB.");
  } catch (error) {
    throw error;
  }
}; 

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
});

//middlewares
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})



app.listen(3001, () => {
    connect();
    console.log("Server is running on port 3000");
});

