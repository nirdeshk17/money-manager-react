import { LoaderCircle } from "lucide-react";
import EmojiPickerPopup from "./EmojiPickerPopUp";
import Input  from "./Input";
import { useEffect, useState } from "react";

const AddCategoryForm=({onAddCategory,isLoading,isEditing,initialCategoryData})=>{
    const [category,setCategory]=useState({
        name:"",
        type:"income",
        icon:""
    })

    const categoryTypeOptions=[
        {value:"income",label:"Income"},
        {value:"expense",label:"Expense"},
    ]

    const handleChange=(key,value)=>{
        setCategory({...category,[key]:value})
    }

    const handleSubmit=()=>{
        onAddCategory(category);
    }


    useEffect(()=>{
        if(isEditing && initialCategoryData){
            setCategory(initialCategoryData);
        }
        else{
            setCategory({name:"",
        type:"income",
        icon:""})
        }
    },[isEditing,initialCategoryData])


    return(<div className="p-4">

       <EmojiPickerPopup icon={category.icon} onSelect={(selectIcon)=>handleChange("icon",selectIcon)}></EmojiPickerPopup>

        <Input value={category.name} onChange={({target})=>handleChange("name",target.value)} label={"Category Name"} placeholder={"eg: Freelance, Salary, Groceries"}>
        </Input>
        
        <Input label={"Category Type"} value={category.type} onChange={(e)=>handleChange("type",e.target.value)} isSelect={true} options={categoryTypeOptions}></Input>
       
         <div className="flex justify-end mt-6">
            <button type="button" onClick={handleSubmit} className="btn-primary">
                {isLoading?(<div className="flex justify-center items-center gap-2">
                    <LoaderCircle className="animate-spin w-5 h-5"></LoaderCircle>
                    <span>Please wait...</span>
                </div>):
                (isEditing?"Update Category":"Add Category")}</button>
         </div>
        </div>)
}

export default AddCategoryForm;