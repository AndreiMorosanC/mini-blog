import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import admin from "./firebase/admin.js";
import dotenv from "dotenv";
import Blog from "./models/Blog.js";
import verifyToken from "./middlewares/auth.js";
import routes from "./routes.js";

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
    const blogs = await Blog.find({ userId: req.user.uid }).sort({
      createdAt: -1,
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tus blogs" });
  }
});

app.delete("/blogs/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    // ⚡️ Cargamos el blog
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: "Blog no encontrado" });

    // 🔒 VALIDACIÓN: solo el creador puede borrarlo
    if (blog.userId !== req.user.uid) {
      return res.status(403).json({ error: "Forbidden: no eres el autor" });
    }

    // Si pasa la validación, lo borramos
    await blog.deleteOne();
    res.json({ message: "Blog eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el blog" });
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

app.put("/blogs/:id", verifyToken, async (req, res) => {
  try {
    // ⚡️ Cargamos el blog
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // 🔒 VALIDACIÓN: solo el creador puede editarlo
    if (blog.userId !== req.user.uid) {
      return res.status(403).json({ error: "Forbidden: no eres el autor" });
    }

    // Si pasa la validación, aplicamos los cambios
    blog.title = req.body.title ?? blog.title;
    blog.text = req.body.text ?? blog.text;
    blog.img = req.body.img ?? blog.img;

    const updated = await blog.save();
    res.json(updated);
  } catch (err) {
    console.error("❌ Error al editar blog:", err);
    res.status(500).json({ error: "Error editing blog" });
  }
});




app.use("/api", routes);

app.listen(3000, () => {
  console.log("✅ Backend escuchando en http://localhost:3000");
});
