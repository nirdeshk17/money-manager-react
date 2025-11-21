import { User } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { use, useContext } from "react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({activeMenu}) => {

const {user}=useContext(AppContext);

const navigate=useNavigate();


    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
           <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
            {user?.profileImage?(
                <img src={user?.profileImage??""} alt="profile image" className="w-20 h-20 bg-slate-400 rounded-full"></img>
            ):(
                <User className="w-20 h-20 text-xl"></User>
            )}
            <h5 className="text-gray-950 font-medium">{user?.fullName??""}</h5>
            </div> 
            {SIDE_BAR_DATA.map((item,index)=>(
                <button 
                onClick={()=>navigate(item.link)}
                className={`cursor-pointer w-full flex items-center gap-4 text[15px] py-3 px-6 rounded-lg mb-3 ${activeMenu==item.title?"text-white bg-purple-800":""}`} key={`menu_${index}`}>
                <item.icon className="text-xl"/>
                {item.title}
                </button>
            ))}
        </div>
    );
}

export default Sidebar;