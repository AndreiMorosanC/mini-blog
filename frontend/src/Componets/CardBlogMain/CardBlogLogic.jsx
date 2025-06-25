import useAllBlogs from '../../hooks/useAllBlogs';
import CardBlog from './CardBlog';

const CardBlogLogic = () => {
  const { blogs, loading } = useAllBlogs();

  if (loading) return <p>Cargando blogs...</p>;

  return (
    <div>
      {blogs.map((blog) => (
        <CardBlog key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default CardBlogLogic;
