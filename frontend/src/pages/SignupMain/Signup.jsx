import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../service/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado correctamente");
      navigate("/");
    } catch (error) {
      console.error("Error registrando usuario:", error.message);
    }
  };

  return (
    <div className="h-160 bg-[#090631]">
      <div className="h-150 w-5/5 sm:w-3/5 lg:w-2/5 bg-amber-50 mx-auto mt-20 flex items-center flex-col justify-center rounded-md">
        <h2 className="text-2xl font-se/mibold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSignup}>
          <label className="block mb-2 text-black">Email</label>
          <input
            type="email"
            className="w-full mb-4 px-3 py-2 border rounded"
            placeholder="tu@ejemplo.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full mb-6 px-3 py-2 border rounded"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex w-full gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-br from-purple-600 to-blue-500 text-white py-2 rounded hover:opacity-90 transition"
            >
              Register
            </button>

            <Link to="/Login" className="flex-1">
              <button className="w-full bg-gradient-to-br from-purple-600 to-blue-500 text-white py-2 rounded hover:opacity-90 transition">
              Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
