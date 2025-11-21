import { LoaderCircle } from "lucide-react";

const DeleteAlert=({content,onDelete,isLoading})=>{
    return(<div>
<p className="text-xl">{content}</p>
 <div className="flex justify-end mt-6">
    <button onClick={onDelete} type="button" className="btn-cancel px-4 text-m cursor-pointer">{isLoading?(<div className="flex justify-center items-center gap-2">
                    <LoaderCircle className="animate-spin w-5 h-5"></LoaderCircle>
                    <span>Please wait...</span>
                </div>):(<div>Delete</div>)}</button>
 </div>
    </div>)
}


export default DeleteAlert;