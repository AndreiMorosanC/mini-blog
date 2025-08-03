import Comments from "../models/Comments.js";



export const createComment = async (req,res) =>{
    const {comment, blogId} = req.body;
    const {uid,email} = req.firebaseUser;

    if(!comment || !blogId){
        return res.status(400).json({error : "faltan campos obligatorios"})
    }

    try{
        const newComents = new Comments({
            comment,
            blogId,
            authorUid: uid,
            authorName: email,
        })
        const saveComment = await newComents.save();
        res.status(201).json(saveComment)
    }catch(err){
        res.status(500).json({error: "Error al guardar el Comentario"})
    }

}