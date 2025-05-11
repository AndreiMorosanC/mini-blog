import { signOut } from "firebase/auth";
import { auth } from "../../service/firebaseConfig";


const BtnSignOut = ()=>{


    const handleLogout = async()=>{
        try{
            await signOut(auth)
        }catch(err){
            console.log("error fail logout", err)
        }
    }


    return(
        <button onClick={handleLogout} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer">
            Logout
        </button>
    )
}


export default BtnSignOut;