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
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-6">
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
  );
};

export default FilterTagsHome;
