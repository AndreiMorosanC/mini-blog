import { useState } from "react";
import { Link } from "react-router-dom";
import useMaxChars from "../../hooks/useMaxChars";
// CardBlog.jsx
const CardBlog = ({ blogList }) => {
  const maxChars = useMaxChars(80, 200);

  return (
    <div className="container mx-auto px-4">
      {/* 1 columna en <lg, 4 en ≥lg */}
      <div className="grid justify-items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 ">
        {blogList.map((blog) => (
          <article
            key={blog._id}
            className="bg-white border rounded-lg shadow p-3 flex flex-col w-5/5 md:w-4/5 lg:w-4/5"
          >
            <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
            <p className="flex-1 mb-6 text-red-50">
              {blog.text.slice(0, maxChars)}
              {blog.text.length > maxChars && "…"}
            </p>
            <Link
              to={`/Blogs/${blog._id}`}
              className="mt-auto inline-block text-center px-4 py-2
                         bg-gradient-to-br from-purple-600 to-blue-500
                         text-white font-medium rounded-lg
                         hover:opacity-90 transition"
            >
              Ver más
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};


export default CardBlog;
