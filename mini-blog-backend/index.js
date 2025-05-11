const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

const Blog = require("./models/blog");



async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido" });
  }
}


app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los blogs" });
  }
});


app.post("/blogs", verifyToken, async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title,
      text: req.body.text,
      img: req.body.img,
      userId: req.user.uid,
      userEmail: req.user.email,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar el blog" });
  }
});


app.get("/myblogs", verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.user.uid }).sort({ createdAt: -1 });
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
      blog.title = req.body.title  ?? blog.title;
      blog.text  = req.body.text   ?? blog.text;
      blog.img   = req.body.img    ?? blog.img;
  
      const updated = await blog.save();
      res.json(updated);
    } catch (err) {
      console.error("❌ Error al editar blog:", err);
      res.status(500).json({ error: "Error editing blog" });
    }
  });
  



app.listen(3000, () => {
  console.log("✅ Backend escuchando en http://localhost:3000");
});
