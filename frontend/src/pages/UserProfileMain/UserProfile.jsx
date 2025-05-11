import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../service/firebaseConfig";
const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
import BtnEditBlog from "../../Componets/BtnEditBlogMain/BtnEditBlog";
import BtnDeleteBlog from "../../Componets/BtnDeleteBlogMain/BtnDeleteBlog";
import BtnSignOut from "../../Componets/BtnSignOutMain/BtnSignOut";

const UserProfile = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user);
        const res = await fetch(`${API_URL}/myblogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUserBlogs(data);
      }
    });

    return () => unsubscribe();
  }, []);

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
      setUserBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== blogId)
      );
    } else {
      const error = await res.json();
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div>
      <h1>Mis blogs</h1>
      {userBlogs
        .filter((blog) => blog.userId === currentUid)
        .map((blog) => (
          <div key={blog._id}>
          <h2>{blog.title}</h2> 
          <img src={blog.img || "default.jpg"} alt="blog" />
          <p>{blog.text}</p>
          <BtnDeleteBlog blog={blog}/>
          <BtnEditBlog blog={blog} />
          </div>
      ))}
      
      <BtnSignOut />
    </div>
  );
};

export default UserProfile;
