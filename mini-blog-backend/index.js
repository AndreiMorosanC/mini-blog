import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import admin from "./firebase/admin.js";
import dotenv from "dotenv";
import Blog from "./models/blog.js";
import verifyToken from "./middlewares/auth.js";
import routes from "./routes.js";
import { updateBlog } from "./controllers/BlogControler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));



app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los blogs" });
  }
});

app.get("/myblogs", verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find({ authorUid: req.firebaseUser.uid }).sort({
      createdAt: -1,
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tus blogs" });
  }
});


app.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Error fetching blog" });
  }
});

app.put("/api", routes)
app.delete("/api", routes)




app.use("/api", routes);

app.listen(3000, () => {
  console.log("✅ Backend escuchando en http://localhost:3000");
});
