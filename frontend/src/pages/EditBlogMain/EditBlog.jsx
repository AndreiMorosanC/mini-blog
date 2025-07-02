import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { auth } from '../../service/firebaseConfig';

const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs/${id}`);
        if (!res.ok) throw new Error('Error al cargar el blog');

        const data = await res.json();
        setTitle(data.title);
        setText(data.text);
        setImg(data.img);
      } catch (error) {
        console.error('Error al cargar el blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleEdit = async () => {
    try {
      const token = await auth.currentUser.getIdToken();

      const res = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, text, img }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      navigate('/UserProfile', { replace: true });
      window.location.reload();
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    }
  };

  return (
    <form
      className="bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit(id);
      }}
    >
       <input
          type="text"
          name="title"
          placeholder="Título del artículo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl font-bold text-gray-900 placeholder-gray-400 focus:outline-none"
          required
        />

        <input
          type="text"
          name="img"
          placeholder="URL de la imagen (opcional)"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="w-full border-b border-gray-300 text-gray-700 py-2 focus:outline-none focus:border-blue-500"
        />

        <textarea
          name="text"
          placeholder="Escribe tu artículo aquí..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[60vh] resize-none text-lg leading-relaxed text-gray-800 focus:outline-none"
          required
        />

      <button type="submit" onClick={() => navigate(`/UserProfile`)}>
        Guardar cambios
      </button>
    </form>
  );
};

export default EditBlog;
