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
  const [user, setUser] = useState(null);

  



  
  

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);



    
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
