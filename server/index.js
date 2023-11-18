import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Link from "./models/Link.js";
const app = express();
app.use(express.json());

dotenv.config();

async function connectMongoDB() {
  const conn = await mongoose.connect(process.env.MONGODB_URL);
  if (conn) {
    console.log("Connected to MongoDB📦");
  }
}
connectMongoDB();

//health api
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Hello Anand...🥳🥳",
  });
});

app.post("/link", async (req, res) => {
  const { url, slug } = req.body;

  const randomSlug = Math.random().toString(36).substring(2, 7);

  const link = new Link({
    url: url,
    slug: slug || randomSlug,
  });

  try {
    const savedLink = await link.save();

    return res.json({
      success: true,
      data: savedLink,
      message: "Link saved successfully",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
