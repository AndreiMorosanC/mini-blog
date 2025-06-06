import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL;


  
  useEffect(() => {
    fetch(`${API_URL}/blogs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("No encontrado")
        return res.json()
      })
      .then(data => setBlog(data))
      .catch(console.error)
  }, [id])

  if (!blog) return <p>Cargando...</p>

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
