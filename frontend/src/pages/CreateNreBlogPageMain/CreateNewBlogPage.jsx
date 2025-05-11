import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import { auth } from "../../service/firebaseConfig";
import { getIdToken } from "firebase/auth";


const CreateNewBlogPage = () => {
  const navigate = useNavigate();

  const [newBlog, setNewBlog] = useState({
    title: "",
    text: "",
    img: "",
  });

  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      console.error("Usuario no autenticado");
      return;
    }

    const token = await getIdToken(user);

    const res = await fetch(`${API_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(newBlog),
    });

    const data = await res.json();
    navigate("/");
  };

  return (
    <div className="h-150 w-5/5 sm:w-5/6 lg:w-3/5 bg-amber-50 mx-auto mt-20 flex  justify-center rounded-md">
      <form onSubmit={handleSubmit} className="flex flex-col w-5/5">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={newBlog.title}
          onChange={handleChange}
        />
        <textarea
          name="text"
          placeholder="Contenido"
          value={newBlog.text}
          onChange={handleChange}
        />
        <input
          type="text"
          name="img"
          placeholder="URL de imagen"
          value={newBlog.img}
          onChange={handleChange}
        />
       
        <button type="submit">Crear blog</button>
        
      </form>
    </div>
  );
};

export default CreateNewBlogPage;
