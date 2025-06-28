import { useParams } from 'react-router-dom';
import useAllBlogs from '../../hooks/useAllBlogs';

function BlogDetail() {
  const { id } = useParams();
  const { blogs, loading } = useAllBlogs();

  if (loading) return <p>Cargando...</p>;

  const blog = blogs.find((b) => b._id === id);
  if (!blog) return <p>Blog no encontrado</p>;

  const tags = Array.isArray(blog.tags) ? blog.tags : [];

  return (
    <article className="w-5/5 sm:w-4/5 lg:w-2/4 mx-auto p-6 bg-gray-100 min-h-150 sm:mt-15 sm:mb-15  ">
      {blog.img && (
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-auto rounded-lg shadow-lg mb-6"
        />
      )}
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold  text-gray-900 mb-2">
          {blog.title}
        </h1>
      </header>

      <p className="whitespace-pre-line text-lg leading-relaxed text-gray-800">
        {blog.text}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default BlogDetail;
