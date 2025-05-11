
import { useEffect, useState } from "react";
import { getIdToken } from "firebase/auth";
import { auth } from "../service/firebaseConfig";

const API_URL = import.meta.env.VITE_API_URL;

export default function UserBlogs() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      const user = auth.currentUser;

      if (user) {
        const token = await getIdToken(user);
        const res = await fetch(`${API_URL}/myblogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUserBlogs(data);
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, []);

  return { userBlogs, setUserBlogs, loading };
}
