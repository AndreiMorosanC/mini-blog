import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  img: { type: String },
  
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
