import useAllBlogs from '../../hooks/useAllBlogs';
import CardBlog from './CardBlog';



const CardBlogLogic = ({activeTag}) => {
  const { blogs, loading } = useAllBlogs(activeTag);

  if (loading) return <p>Cargando blogs...</p>;

  return (
    <div className='flex items-center flex-col m-5 gap-3'>
      {blogs.map((blog) => (
        <CardBlog key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default CardBlogLogic;
