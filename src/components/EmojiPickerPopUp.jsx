import EmojiPicker from "emoji-picker-react";
import { Image, X } from "lucide-react";
import { useState } from "react";

const EmojiPickerPopup=({icon,onSelect})=>{


const [isOpen,setIsOpen]=useState(false);


    return(
    <div className="flex flex-col md:flew-row items-start gap-5 mb-5">
    <div
    onClick={()=>setIsOpen(true)}
    className="flex items-center gap-4 cursor-pointer">
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
        {icon?(<img src={icon} alt="Icon"className="w-12 h-12"></img>):(<Image></Image>)}
        </div>
        {isOpen&&(<div className="relative">
            
            <EmojiPicker 
            open={isOpen}
            onEmojiClick={(emoji)=>{
                onSelect(emoji?.imageUrl||"")
                setIsOpen(false)
            }}
            ></EmojiPicker>
             <button onClick={(e)=>{ 
                e.stopPropagation();
                setIsOpen(false)}} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-3 -right-3 cursor-pointer">
                  <X></X>  
            </button>
            </div>)}
           
            <p>{icon?"Change icon":"Pick icon"}</p>
    </div>
    </div>
)
}

export default EmojiPickerPopup;