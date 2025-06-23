import Tag from "../models/Tag.js";

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los tags" });
  }
};

export const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const existing = await Tag.findOne({ name });
    if (existing) return res.status(400).json({ error: "El tag ya existe" });

    const tag = new Tag({ name });
    await tag.save();
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ error: "Error al crear el tag" });
  }
};
