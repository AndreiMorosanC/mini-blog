import { Link } from 'react-router-dom';
import useMaxChars from '../../hooks/useMaxChars';
import BtnDeleteBlog from '../BtnDeleteBlogMain/BtnDeleteBlog';
import BtnEditBlog from '../BtnEditBlogMain/BtnEditBlog';

const CardBlog = ({ blog, showButtons = false, onDeleteBlog }) => {
  const maxChars = useMaxChars(80, 200);

  return (
    <article className="bg-white border rounded-lg shadow p-5 flex flex-col w-5/5 md:w-4/5 lg:w-2/4">
      <Link
        to={`/blogs/${blog._id}`}
        state={{ blog }}
        className="inline-block w-fit"
      >
        { <h2 className="text-2xl font-bold mb-4 w-fit">{blog.title}</h2>}
      </Link>
     
      <h2>{Array.isArray(blog.tags) ? blog.tags.join(', ') : 'Sin tags'}</h2>
      <p className="flex-1 mb-6 text-black">
        {blog.text
          ? blog.text.slice(0, maxChars) +
            (blog.text.length > maxChars ? '…' : '')
          : 'Sin contenido'}
      </p>
      

      

      {showButtons && (
        <div className="flex gap-2 mt-4">
          <BtnDeleteBlog blog={blog} onDelete={onDeleteBlog} />
          <BtnEditBlog />
        </div>
      )}
    </article>
  );
};

export default CardBlog;
