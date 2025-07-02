import { Link } from 'react-router-dom';
import useMaxChars from '../../hooks/useMaxChars';
import BtnDeleteBlog from '../BtnDeleteBlogMain/BtnDeleteBlog';
import BtnEditBlog from '../BtnEditBlogMain/BtnEditBlog';

const CardBlog = ({ blog, showButtons = false, onDeleteBlog }) => {
  const maxChars = useMaxChars(80, 200);

  return (
    <article className="bg-white border rounded-lg shadow p-5 flex flex-col w-5/5 md:w-4/5 lg:w-5/5">
      <Link
        to={`/blogs/${blog._id}`}
        state={{ blog }}
        className="inline-block w-fit"
      >
        {<h2 className="text-2xl font-bold mb-4 w-fit">{blog.title}</h2>}
      </Link>

      {Array.isArray(blog.tags) && blog.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-4">Sin tags</p>
      )}

      <p className="flex-1 mb-6 text-black">
        {blog.text
          ? blog.text.slice(0, maxChars) +
            (blog.text.length > maxChars ? '…' : '')
          : 'Sin contenido'}
      </p>

      {showButtons && (
        <div className="flex gap-2 mt-4">
          <BtnDeleteBlog blog={blog} onDelete={onDeleteBlog} />
          <BtnEditBlog blogId={blog._id} />
        </div>
      )}
    </article>
  );
};

export default CardBlog;
