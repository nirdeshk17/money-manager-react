import { Cross, Delete, Plus, Trash, Upload, User, X } from "lucide-react";
import { useRef, useState } from "react";

const ProfilePhotoSelector=({image,setImage})=>{
    const inputRef=useRef(null)
    const [previewUrl,setPreviewUrl]=useState(null);


    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            setImage(file);
           const preview=URL.createObjectURL(file)
           setPreviewUrl(preview);
        }
    }

    const handleRemoveImage=()=>{
        setImage(null);
        setPreviewUrl(null);
        inputRef.current.value=null;
    }

    const onChooseFile=()=>{
        inputRef.current.click();
    }

    return(
       <div className="flex justify-center mb-6">
        <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} className="hidden"></input>
       
       {!image?(
        <div className="w-20 h-20 flex items-center justify-center bg-purple-200 rounded-full relative">
        <User className="text-purple-500" size={35}></User>
        <button type="button" className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1" onClick={onChooseFile}>
            <div className="flex items-center justify-center bg-purple-300 w-5 h-5 rounded-full">
                <Plus size={15} className="text-purple-500"></Plus>
            </div>
        </button>
       </div>):(
        <div className="relative">
        <img src={previewUrl} alt="profile photo" className="w-20 h-20 rounded-full object-cover"/>
       <button className="absolute -bottom-3 -right-2 w-5 h-5 flex items-center justify-center bg-red-800 text-white rounded" onClick={handleRemoveImage}>
            <X size={15}></X>
       </button>
       </div>
    )}
       </div>
    );
}

export default ProfilePhotoSelector;