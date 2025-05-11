import { useEffect, useState } from "react";



const BtnDeleteBlog = ({blog})=>{


    const handleDelete = async (blogId) => {
            const user = auth.currentUser;
            const token = await user.getIdToken();
    
            const res = await fetch(`${API_URL}/blogs/${blogId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
    
            if (res.ok) {
            // 🔄 Actualiza el estado sin el blog eliminado
            setUserBlogs((prevBlogs) =>
                prevBlogs.filter((blog) => blog._id !== blogId)
            );
            } else {
            const error = await res.json();
            console.error("Error al eliminar:", error);
            }
        };


    return(
        <div>
             <button onClick={() => handleDelete(blog._id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer">
                🗑️ Eliminar
            </button>
        </div>
    )
}


export default BtnDeleteBlog;