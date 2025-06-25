import { useState, useEffect } from "react";
import BtnCreateBlog from "../../Componets/BtnCreateBlogMain/BtnCreateBlog";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../service/firebaseConfig";
import BtnUserProfile from "../../Componets/BtnUserProfileMain/BtnUserProfile";
import CardBlog from "../../Componets/CardBlogMain/CardBlog";
import BtnSignUp from "../../Componets/BtnSignUpMain/BtnSignUp";
import CardBlogList from "../../Componets/CardBlogMain/CardBlogList";
import TagsList from "../../Componets/TagsMain/TagsList";
import CardBlogLogic from "../../Componets/CardBlogMain/CardBlogLogic";

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [blogList, setBlogList] = useState([]);
  const [user, setUser] = useState(null);
  const [listOfBlogs, setListOfBlogs] = useState([])
  const [articles, setArticles] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  useEffect(() => {
    fetch(`${API_URL}/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogList(data))
      .catch((error) => console.error("Error al cargar blogs:", error));
  }, []);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);


    useEffect(()=>{
      fetch(`https://dev.to/api/articles`)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error al cargar blogs:", error));
    },[])

    
  return (
    <div>
      <h1>Bienvenido a Home</h1>

      {user ? (
        <>
          <h2>Bienvenido, {user.email}</h2>
          
          
        </>
      ) : (
        <h2>Por favor, regístrate o inicia sesión</h2>
      )}

     
      <CardBlogLogic/>
    </div>
  );
};

export default Home;
