import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogForm } from '../../hooks/useBlogForm';
import TagsList from '../../Componets/TagsMain/TagsList';



const CreateNewBlogPage = () => {
  const navigate = useNavigate();

  const {
    title, setTitle,
    text, setText,
    tags, setTags,
    img,
    setImg,
    submitBlog,
  } = useBlogForm();





  const handleSubmit = async (e) => {
  e.preventDefault(); 
  try {
    await submitBlog();
    console.log(tags)
    navigate("/");
  } catch (err) {
    console.error(err.message);
    
  }
};  





  return (
    <div className="h-150 w-5/5 sm:w-5/6 lg:w-3/5 bg-amber-50 mx-auto mt-20 flex  justify-center rounded-md">
      <form onSubmit={handleSubmit} className="flex flex-col w-5/5">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="text"
          placeholder="Contenido"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />  
        <input
          type="text"
          name="img"
          placeholder="URL de imagen"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <TagsList selectedTags={tags} setSelectedTags={setTags} />

        <button type='submit' className="btn-primary mt-4">
        Publicar blog
      </button>
      </form>
    </div>
  );
};

export default CreateNewBlogPage;
