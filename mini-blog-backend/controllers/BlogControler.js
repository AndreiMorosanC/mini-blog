import Blog from "../models/Blog.js"




export const createBlog = async (req, res) =>{

    const {title, text, img} = req.body;
    const {uid} = req.firebaseUser;

    if(!title || !text || !img){
        return res.status(400).json({error : "faltan campos obligatorios"})

    }
        try{
            const newBlog = new Blog({
                title,
                text,
                img,
                authorUid: uid,
                authorName: dbUser.username,
            });
            const saveBlog = await newBlog.save();
            res.status(201).json(saveBlog);
        }catch(err){
            res.status(500).json({error: "Error al guardar el blog"})
        }
} 