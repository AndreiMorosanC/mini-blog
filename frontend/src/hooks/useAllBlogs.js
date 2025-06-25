import { useEffect, useState } from 'react';

const useAllBlogs = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const localRes = await fetch(`${API_URL}/blogs`);
        const localBlogs = await localRes.json();

        const externalRes = await fetch(
          `https://dev.to/api/articles?per_page=5`,
        );
        const externalBlogs = await externalRes.json();

        const externalDetails = await Promise.all(
          externalBlogs.map(async (blog) => {
            try {
              const res = await fetch(`https://dev.to/api/articles/${blog.id}`);
              const fullData = await res.json();

              return {
                _id: fullData.id.toString(),
                title: fullData.title,
                text: fullData.body_markdown || 'Sin contenido',
                img: fullData.cover_image || '',
                tags: fullData.tag_list || [],
                isExternal: true,
                url: fullData.url,
              };
            } catch (err) {
              console.error(
                `Error al cargar el blog externo con ID ${blog.id}`,
                err,
              );
              return null;
            }
          }),
        );

        // Filtra posibles nulos por errores
        const adaptedExternal = externalDetails.filter(Boolean);

        const allBlogs = [...localBlogs, ...adaptedExternal];
        setBlogs(allBlogs);
        console.log(allBlogs);
      } catch (error) {
        console.error('Error al cargar blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading };
};

export default useAllBlogs;
