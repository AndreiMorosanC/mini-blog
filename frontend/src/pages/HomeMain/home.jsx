import { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../service/firebaseConfig';

import CardBlogLogic from '../../Componets/CardBlogMain/CardBlogLogic';
import FilterTagsHome from '../../Componets/TagsMain/FilterTagsHome';

const Home = () => {
  const [user, setUser] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
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

      <div className="flex w-full min-h-screen">
        {/* Izquierda - Tags */}
        <div className="w-1/5 p-4">
          <FilterTagsHome  activeTag={activeTag} setActiveTag={setActiveTag}/>
        </div>

        {/* Centro - Blogs */}
        <div className="w-3/5 p-4">
          <CardBlogLogic activeTag={activeTag} />
        </div>

        
        <div className="w-1/5 p-4">
          
      
        </div>
      </div>
    </div>
  );
};

export default Home;
