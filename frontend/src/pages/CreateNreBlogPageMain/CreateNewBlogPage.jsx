import { useNavigate } from 'react-router-dom';
import { useBlogForm } from '../../hooks/useBlogForm';
import TagsList from '../../Componets/TagsMain/TagsList';

const CreateNewBlogPage = () => {
  const navigate = useNavigate();

  const {
    title,
    setTitle,
    text,
    setText,
    tags,
    setTags,
    img,
    setImg,
    submitBlog,
  } = useBlogForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitBlog();
      console.log(tags);
      navigate('/');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="w-5/5 sm:w-4/5 lg:w-2/4 mx-auto  bg-gray-100 min-h-150 sm:mt-15 sm:mb-15 ">
      <form className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg space-y-6">
        <input
          type="text"
          name="title"
          placeholder="Título del artículo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl font-bold text-gray-900 placeholder-gray-400 focus:outline-none"
          required
        />

        <input
          type="text"
          name="img"
          placeholder="URL de la imagen (opcional)"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="w-full border-b border-gray-300 text-gray-700 py-2 focus:outline-none focus:border-blue-500"
        />

        <textarea
          name="text"
          placeholder="Escribe tu artículo aquí..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[60vh] resize-none text-lg leading-relaxed text-gray-800 focus:outline-none"
          required
        />

        {/* Aquí puedes poner tus TagsList */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <TagsList selectedTags={tags} setSelectedTags={setTags} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Publicar artículo
        </button>
      </form>
    </div>
  );
};

export default CreateNewBlogPage;
