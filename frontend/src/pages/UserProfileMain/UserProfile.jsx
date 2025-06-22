import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../service/firebaseConfig';
const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');
import BtnEditBlog from '../../Componets/BtnEditBlogMain/BtnEditBlog';
import BtnDeleteBlog from '../../Componets/BtnDeleteBlogMain/BtnDeleteBlog';
import BtnSignOut from '../../Componets/BtnSignOutMain/BtnSignOut';
import CardBlogList from '../../Componets/CardBlogMain/CardBlogList';

const UserProfile = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user);
        const res = await fetch(`${API_URL}/api/myblogs`, {
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

  return (
    <div>
      <h1 className="bg-white">Mis blogs</h1>
      <CardBlogList
        blogList={userBlogs.filter((blog) => blog.authorUid === currentUid)}
        showButtons={true}
        onDeleteBlog={(id) => {
          setUserBlogs((prev) => prev.filter((blog) => blog._id !== id));
        }}
      />

      <BtnSignOut />
    </div>
  );
};

export default UserProfile;
