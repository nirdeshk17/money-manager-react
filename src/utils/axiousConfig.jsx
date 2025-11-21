import axios from "axios";
import { BASE_URL } from "./apiEndpoints";




const axiousConfig=axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
    }
})

//list of endpoints to exclude from attaching auth token
const excludeEndpoints=["/login","/register","/status","/activate","health"];

//request interceptor
axiousConfig.interceptors.request.use((config)=>{
    const shouldSkipToken=excludeEndpoints.some((endpoints)=>{
       return config.url.includes(endpoints);
    })
    if(!shouldSkipToken){

    
        const token=localStorage.getItem("authToken");
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
    }
    return config;
},(error)=>{
    return Promise.reject(error);
})

//response interceptor
axiousConfig.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    if(error.response){
        if(error.response.status==401){
            window.location.href="/login";
        }else if(error.response.status==500){
            console.error("Server error occurred");
        }
        else if(error.response.status==403){
              console.error("Access forbidden");
    }
    else if(error.response.code=="ECONNABORTED"){
        console.error("Request timeout. Please try again later.");
    }
    return Promise.reject(error);
}});

export default axiousConfig;