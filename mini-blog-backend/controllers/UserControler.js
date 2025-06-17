import User from "../models/User.js";

export const NewUser = async (req, res) => {
  try {
    const { uid, email } = req.firebaseUser;
    const existingUser = await User.findOne({ userId: uid });
    if (existingUser) {
      return res.status(200).json({
        mensaje: "Usuario ya registrado",
        user: { uid, email },
      });
    }
    const newUser = new User({
      userId: uid,
      userEmail: email,
    });
    await newUser.save();

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      user: { uid, email },
    });
  } catch (err) {
    console.error("Error al guardar el usuario:", err);
    res.status(500).json({ error: "Error al guardar el usuario" });
  }
};
