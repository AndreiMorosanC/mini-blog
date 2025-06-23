// seedTags.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Tag from "./models/Tag.js";

dotenv.config();

const tags = [
  "JavaScript",
  "React",
  "CSS",
  "Node.js",
  "MongoDB",
  "AI",
  "Startup",
  "Productividad",
  "UX/UI",
  "Web3",
  "Tech News",
  "Entrevistas",
  "Diseño",
  "Full Stack",
  "Frontend",
  "Backend",
];

async function seedTags() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    for (const name of tags) {
      await Tag.updateOne({ name }, { name }, { upsert: true });
    }

    console.log("🌱 Tags insertados correctamente");
    process.exit();
  } catch (error) {
    console.error("❌ Error insertando tags:", error);
    process.exit(1);
  }
}

seedTags();
