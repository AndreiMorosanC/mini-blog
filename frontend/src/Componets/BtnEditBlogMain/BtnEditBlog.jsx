import { useNavigate } from "react-router-dom";

const BtnEditBlog = ({ blog }) => {
    const navigate = useNavigate();
  
    return (
      <button onClick={() => navigate(`/EditBlog/${blog._id}`)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer">
        Editar
      </button>
    );
  };

  

  export default BtnEditBlog