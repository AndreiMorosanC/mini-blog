import Blog from "../models/blog.js";




export const createBlog = async (req, res) =>{

    const {title, text, img, tags} = req.body;
    const {uid,email} = req.firebaseUser;

    if(!title || !text || !img){
        return res.status(400).json({error : "faltan campos obligatorios"})

    }
        try{
            const newBlog = new Blog({
                title,
                text,
                img,
                authorUid: uid,
                authorName: email,
                tags: tags,
            });
            const saveBlog = await newBlog.save();
            res.status(201).json(saveBlog);
        }catch(err){
            res.status(500).json({error: "Error al guardar el blog"})
        }
} 



export const updateBlog =  async(req,res)=>{
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


}


export const DeleteBlog = async(req,res)=> {
    const id  = req.params.id;
      try {
        // ⚡️ Cargamos el blog
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: "Blog no encontrado" });
    
        // 🔒 VALIDACIÓN: solo el creador puede borrarlo
        if (blog.authorUid !== req.firebaseUser.uid) {
          return res.status(403).json({ error: "Forbidden: no eres el autor" });
        }
    
        // Si pasa la validación, lo borramos
        await blog.deleteOne();
        res.json({ message: "Blog eliminado correctamente" });
      } catch (err) {
        res.status(500).json({ error: "Error al eliminar el blog" });
      }

}

export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ authorUid: req.firebaseUser.uid }).sort({
      createdAt: -1,
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tus blogs" });
  }
};


export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Error fetching blog" });
  }
};
