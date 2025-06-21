import admin from "../firebase/admin.js";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.firebaseUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export default verifyToken;
