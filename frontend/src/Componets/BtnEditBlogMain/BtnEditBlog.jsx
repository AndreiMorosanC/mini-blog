import { useNavigate } from "react-router-dom";

const BtnEditBlog = ({ blogId  }) => {
    const navigate = useNavigate();
  
   return (
    <button
      onClick={() => navigate(`/editblog/${blogId}`)}
      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Editar
    </button>
  );
  };

  

  export default BtnEditBlog