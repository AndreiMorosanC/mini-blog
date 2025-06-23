import { useState } from 'react';
import { getIdToken } from 'firebase/auth';
import { auth } from '../service/firebaseConfig';

export function useBlogForm() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [tags, setTags] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const resetForm = () => {
    setTitle('');
    setText('');
    setImg('');
    setTags([]);
  };

  const submitBlog = async () => {
    const blogData = { title, text, img, tags };

    const user = auth.currentUser;
    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }

    const token = await getIdToken(user);
    console.log(token);

    const res = await fetch(`${API_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });

    const data = await res.json();
    console.log('Respuesta del servidor:', res.status, data);

    if (!res.ok) {
      throw new Error(data.error || 'Error al crear el blog');
    }
  };

  return {
    title,
    setTitle,
    text,
    setText,
    img,
    setImg,
    tags,
    setTags,
    submitBlog,
    resetForm,
  };
}
