import { useEffect, useState } from 'react';

const useAllBlogs = (activeTag) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const localRes = await fetch(`${API_URL}/blogs`);
        const localBlogs = await localRes.json();

        const externalRes = await fetch(
          `https://dev.to/api/articles?per_page=5`,
        );
        const externalBlogs = await externalRes.json();

        const externalDetails = await Promise.all(
          externalBlogs.map(async (blog) => {
            const res = await fetch(`https://dev.to/api/articles/${blog.id}`);
            const fullData = await res.json();
            return {
              _id: fullData.id.toString(),
              title: fullData.title,
              text: fullData.body_markdown || 'Sin contenido',
              img: fullData.cover_image || '',
              tags: Array.isArray(fullData.tag_list)
                ? fullData.tag_list
                : typeof fullData.tag_list === 'string'
                  ? fullData.tag_list.split(',').map((tag) => tag.trim())
                  : [],

              isExternal: true,
              url: fullData.url,
            };
          }),
        );

        const adaptedExternal = externalDetails.filter(Boolean);

        let allBlogs = [...localBlogs, ...adaptedExternal];

        if (activeTag) {
          allBlogs = allBlogs.filter((b) => b.tags?.includes(activeTag.name));
        }

        setBlogs(allBlogs);
      } catch (err) {
        console.error('Error cargando blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeTag]);

  return { blogs, loading };
};

export default useAllBlogs;
