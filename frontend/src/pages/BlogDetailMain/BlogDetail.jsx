import { useParams } from "react-router-dom"

import useAllBlogs from "../../hooks/useAllBlogs"

function BlogDetail() {
  const { id } = useParams()
  const { blogs, loading } = useAllBlogs();

  const blog = blogs.find((b) => b._id === id);

  if (loading) return <p>Cargando...</p>;
  if (!blog) return <p>Blog no encontrado</p>;

  return (
    <article className="w-5/5 sm:w-4/5 lg:w-3/5 mx-auto p-6 bg-amber-50 min-h-150 sm:mt-15 sm:mb-15 " >
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {blog.img && (
        <img src={blog.img} alt={blog.title} className="w-full mb-6" />
      )}
      <p className="whitespace-pre-line">{blog.text}</p>
    </article>
  )
}

export default BlogDetail
