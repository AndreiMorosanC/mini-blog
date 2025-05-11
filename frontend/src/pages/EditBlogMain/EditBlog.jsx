import { useEffect, useState } from "react";
import { auth } from "../../service/firebaseConfig";
import { getIdToken } from "firebase/auth";
const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
import UserBlogs from "../../hooks/UserBlogs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userBlogs, setUserBlogs, loading } = UserBlogs();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`${API_URL}/blogs/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setText(data.text);
      setImg(data.img);
    };

    fetchBlog();
  }, [id]);

  const handleEdit = async (blogId) => {
    const token = await auth.currentUser.getIdToken();
    await fetch(`${API_URL}/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, text, img }),
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit(id);
      }}
    >
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <input value={img} onChange={(e) => setImg(e.target.value)} />

      <button type="submit" onClick={() => navigate(`/UserProfile`)}>
        Guardar cambios
      </button>
    </form>
  );
};

export default EditBlog;
