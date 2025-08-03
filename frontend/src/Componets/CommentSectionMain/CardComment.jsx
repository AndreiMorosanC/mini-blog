import { useState } from "react";
import { useAuth } from "../../hooks/useAuth ";
const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const CardComment = ({ blogId }) => {
  const [text, setText] = useState("");
    const {token} = useAuth()



  const handleSubmit = async () => {
  try {
    const res = await fetch(`${API_URL}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Asegúrate de que `token` está definido
      },
      body: JSON.stringify({
        blogId: blogId,
        userId: user.uid,
        userEmail: user.email,
        comment: text,
      }),
    });

    if (!res.ok) throw new Error("Respuesta inválida");
    console.log("Comentario enviado");
  } catch (err) {
    console.error("Error al enviar comentario", err);
  }
};


  return (
    <div>
      <textarea
        name="text"
        placeholder="Write your comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Send Comment
      </button>
    </div>
  );
};

export default CardComment;
