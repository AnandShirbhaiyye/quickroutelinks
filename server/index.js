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
      data: {
        shortUrl: `${process.env.BASE_URL}/${savedLink.slug}`,
      },
      message: "link saved successfully",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  const link = await Link.findOne({ slug: slug });

  await Link.updateOne(
    { slug: slug },
    {
      $set: {
        clicks: link.clicks + 1,
      },
    }
  );

  if (!link) {
    return res.json({
      success: false,
      message: "link not found",
    });
  }

  res.redirect(link.url);
});

app.get("/api/links", async (req, res) => {
  const links = await Link.find({});

  return res.json({
    success: true,
    data: links,
    message: "links fetched successfully",
  });
});

app.delete("/url/:id", async (req, res) => {
  const { id } = req.params;

  await Link.deleteOne({ _id: id });

  res.json({
    success: true,
    message: "url deleted successfully...",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
