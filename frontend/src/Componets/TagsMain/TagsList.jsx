import { useEffect, useState } from 'react';

const TagsList = ({ selectedTags, setSelectedTags }) => {
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/tags`)
      .then((res) => res.json())
      .then(setTags)
      .catch(console.error);
  }, []);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {selectedTags.length > 0
          ? `Tags: ${selectedTags.join(', ')}`
          : 'Elige hasta 3 tags'}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-56 bg-white border rounded shadow-lg">
          <ul className="p-2 space-y-1">
            {tags.map(({ name }) => (
              <li
                key={name}
                onClick={() => toggleTag(name)}
                className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(name)}
                  readOnly
                />
                <span>{name}</span>
              </li>
            ))}
            <button
              onClick={() => onConfirm(selectedTags)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Confirmar
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TagsList;
