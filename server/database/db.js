import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      console.log(`Connected to ${data.connection.host}`);
    })
    .catch((err) => {
      console.log("Error while connecting to database", err.message);
    });
};

export default Connection;
