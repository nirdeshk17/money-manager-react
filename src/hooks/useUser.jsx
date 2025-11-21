import { useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";
import axiousConfig from "../utils/axiousConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const useUser=()=>{
  const{user,setUser,clearUser}=useContext(AppContext);
  const navigate=useNavigate();

  useEffect(()=>{
    if(user){
        return;
    }
    let isMounted=true;

    const fetchUserInfo=async()=>{
        try {
         const response=await axiousConfig.get(API_ENDPOINTS.FETCH_USER_INFO); 
         if(isMounted&&response.data){
            setUser(response.data);
         }
        } catch (error) {
          console.error("Failed to fetch user info",error);
          if(isMounted){
            clearUser();
            navigate("/login")
          }  
        }
    }
fetchUserInfo();
return()=>{
    isMounted=false;
}

  },[setUser,clearUser,navigate])
}