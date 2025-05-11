import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../service/firebaseConfig';







const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async e => {
    e.preventDefault();
    setError(null)
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("Usuario Logueado:", userCredential.user)
      navigate("/")
    }catch(err){
      console.log(err)
      setError("email o contraseña invalidos")
    }
  }



  return (
    <div className="h-160 bg-[#090631]">
      <div className="h-150 w-5/5 sm:w-5/6 lg:w-3/5 bg-amber-50 mx-auto mt-20 flex items-center flex-col justify-center rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Iniciar sesión
        </h2>
        <form
          onSubmit={handleSubmit}
          >
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full mb-4 px-3 py-2 border rounded"
            placeholder="tu@ejemplo.com"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label className="block mb-2">Contraseña</label>
          <input
            type="password"
            className="w-full mb-6 px-3 py-2 border rounded"
            placeholder="••••••••"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-purple-600 to-blue-500 text-white py-2 rounded hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
