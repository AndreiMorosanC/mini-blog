import CardBlog from './CardBlog';

const CardBlogList = ({ blogList, showButtons = false, onDeleteBlog }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid justify-items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {blogList.map((blog) => (
          <CardBlog
            key={blog._id}
            blog={blog}
            showButtons={showButtons}
            onDeleteBlog={onDeleteBlog}
          />
        ))}
      </div>
    </div>
  );
};

export default CardBlogList;
