import { ArrowBigDown, ArrowBigDownDashIcon, Calendar, ChevronDown, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input=({label,value,onChange,placeholder,type,isSelect, options})=>{


 const[showPassword,setShowPassword]=useState(false);

   const togglePasswordVisibility=()=>{
     setShowPassword(!showPassword); 
  }


    return(
        <div className="mb-4">
            <label className="text-sm text-slate-800 block mb-1">
                {label}
            </label>
            <div className="relative">
              {isSelect ?(
                <select className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2.5 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500 appearance-none" value={value} onChange={(e)=>onChange(e)}>
                  {options.map((option)=>{
                    return(<option key={option.value} value={option.value}>{option.label}</option>)
                  })}
                </select>):
                
                ( <input
                className={`w-full bg-transparent outline-none border border-gray-300 rounded-md py-2.5 px-2 ${type=="password"?"pr-10":"pr-1"} text-black-400 placeholder-gray-400 leading-tight focus:outline-none focus:border-blue-500`}
                 type={type=="password"?(showPassword?"text":"password"):type} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}>
                </input>)}
               
                  {type==="password"&&(<span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    {showPassword?<Eye size={20} className="text-purple-800" onClick={togglePasswordVisibility} />:<EyeOff
                    size={20} className="text-purple-800" onClick={togglePasswordVisibility}
                    />}
                    </span>)
                    }
                    {type=="date"&&(<span className="absolute right-3 top-2 translate-0.5 cursor-pointer">
                    <Calendar size={20}></Calendar>
                    </span>)}
                    {isSelect&&(<span className="absolute right-3 top-1 translate-y-1/2">
                    <ChevronDown size={20}></ChevronDown>
                    </span>)}
                
            </div>
        </div>
    )
}

export default Input;