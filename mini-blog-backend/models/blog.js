import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    description: { type: String }, // extracto corto
    img: { type: String, required: true }, // imagen principal
    tags: [{ type: String }], // array de etiquetas
    authorUid: { type: String, required: true },
    authorName: { type: String, required: true },
    readTime: { type: Number }, // minutos de lectura estimados
    publishedAt: { type: Date, default: Date.now }, // fecha de publicación
    sourceUrl: { type: String }, // útil para artículos externos
    isExternal: { type: Boolean, default: false }, // para distinguir los de Forem
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
