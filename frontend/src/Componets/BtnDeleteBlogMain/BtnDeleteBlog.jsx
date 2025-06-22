// BtnDeleteBlog.jsx
import { auth } from "../../service/firebaseConfig";
const API_URL = import.meta.env.VITE_API_URL;

const BtnDeleteBlog = ({ blog, onDelete }) => {
  const handleDelete = async () => {
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();

      const res = await fetch(`${API_URL}/api/blogs/${blog._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        onDelete(blog._id); // Llama al padre para actualizar el estado
      } else {
        const error = await res.json();
        console.error("Error al eliminar:", error);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer"
    >
      🗑️ Eliminar
    </button>
  );
};

export default BtnDeleteBlog;
