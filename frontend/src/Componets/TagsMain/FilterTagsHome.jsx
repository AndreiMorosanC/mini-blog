import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');

const FilterTagsHome = ({ activeTag, setActiveTag }) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/tags`)
      .then((res) => res.json())
      .then(setTags)
      .catch(console.error);
  }, []);

  return (
    <div className='bg-white rounded-lg overflow-hidden w-60 h-96 mt-15 ml-15 p-4'>
      <div className="  max-h-82 overflow-y-auto p-2 custom-scroll ">
        <h1 className="font-sans uppercase tracking-widest text-black font-normal text-center text-2xl mb-3">
          Tags
        </h1>
        <div className="flex flex-col gap-2 mb-6">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded ${activeTag === null ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Todos
          </button>

          {tags.map((tag) => (
            <button
              key={tag._id}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded ${activeTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterTagsHome;
