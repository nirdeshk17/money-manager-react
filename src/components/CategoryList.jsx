import { Categories } from "emoji-picker-react";
import { Layers2, Pencil, PencilIcon } from "lucide-react";

const CategoryList=({categories,onEditCategory,onDeleteCategory})=>{

   

    return(
        <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Category Sources</h4>
            </div>
            {/* Category List */}
            {categories.length===0?(<p className="text-gray-500">
                No Categories added yet. Add some to get started!
            </p>):(<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               
               {categories.map((category)=>(
                
                <div key={category.id} className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60">
                  
                    {/* Icon/emoji display */}
                   <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full ">
                    {category.icon?(<span className="text-2xl"><img src={category.icon} alt={category.name}></img></span>):(<Layers2 className="text-purple-900" size={24}></Layers2>)}
                   </div>
                    {/* Category Details */}
                    <div className="flex-1 flex items-center justify-between">
                        <div>
                               <div>{category.name}</div>
                            <p className="text-sm text-gray-400 mt-1 capitalize">
                                {category.type}
                            </p>
                        </div>
                    </div>
                    {/* Action Button */}
                    <div className="flex items-center gap-2">
                        <button onClick={()=>onEditCategory(category)} className="text-gray-400 hover:text-blue-800 opacity-0 group-hover:opacity-60">
                            <PencilIcon size={18}></PencilIcon>
                        </button>
                    </div>
                </div>
             
               ))}
            </div>)}
        </div>
    )
}

export default CategoryList;