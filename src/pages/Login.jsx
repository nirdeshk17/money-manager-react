import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import Input from "../components/Input";
import { validateEmail } from "../utils/validation";
import axiousConfig from "../utils/axiousConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";



const Login=()=>{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");
   const navigate=useNavigate();
   const{setUser}=useContext(AppContext)
   
   const [isLoading,setIsLoading]=useState(false);

   const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter valid email address");
      return;
    }
    if(!password.trim()){
      setError("Please enter password");
      return;
    }
    setError("");
setIsLoading(true);
try {
const response= await axiousConfig.post(API_ENDPOINTS.LOGIN,{email,password})

if(response.status==200){
  const {token,user}=response.data;
  localStorage.setItem("authToken",token);
  setUser(user);
  navigate("/dashboard");
      toast.success("Login successful!");
    }
   

} catch (error) {
  if(error.response.data && error.response.data.message){
    setError(error.response.data.message);
  }else{
    setError("An error occurred during login. Please try again.");
  }
}finally{
      setIsLoading(false);
}

   }


    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm"></img>
        <div className="relative z-10 w-full max-w-lg px-6">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-semibold text black text-center mb-2">Welcome Back</h3>
            <p className="text-sm text-slate-700 text-center mb-8">
                Please enter your details to login.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex justify-center mb-6">
                {/* Profile image */}
              </div>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} label="Email Address" placeholder="name@example.com" type="text"></Input>
                <div className="col-span-2">
                <Input value={password} onChange={(e)=>setPassword(e.target.value)} label="Password" placeholder="*********" type="password"></Input>
              </div>
              {error && (<p className="px-2 bg-red-100 text-red-800 text-sm text-center bg-red 50 p-2 rounded">
                {error}
              </p>)}
             <button
  disabled={isLoading}
  type="submit"
  className={`bg-purple-900 text-white rounded-lg py-3 px-6 font-medium hover:bg-purple-800 transition-colors w-full flex items-center justify-center gap-2 ${
    isLoading ? "opacity-60 cursor-not-allowed" : ""
  }`}
>
  {isLoading ? (
    <>
      <LoaderCircle className="animate-spin w-5 h-5" />
      <span>Please wait...</span>
    </>
  ) : (
    "Login"
  )}
</button>
                <p className="text-sm text-slate-800 text-center MT-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors">
                    Sign up
                    </Link>
                </p>
            </form>
            </div>
        </div>
        </div>
    );
}

export default Login;