import { useEffect, useState } from "react";
import { Label } from "recharts";
import EmojiPickerPopup from "./EmojiPickerPopUp";
import Input from "./Input";
import { Loader, LoaderCircle } from "lucide-react";


const AddIncomeForm=({onAddIncome,categories,isLoading})=>{
    const [income,setIncome]=useState({
        name:'',
        amount:'',
        date:'',
        icon:'',
        categoryId:categories[0].categoryId
    })

    useEffect(()=>{
     if(categories.length>0){
        setIncome(value=>({
            ...value,categoryId:categories[0].id
        }))
     }

     setIncome(value=>({
       ...value,date:new Date().toISOString().split("T")[0]
     }))
    },[categories])

   const categoryOptions= categories.map(category=>({
        value:category.id,
        label:category.name,
    }))
    

    const handleChange=(key,value)=>{
        setIncome({...income,[key]:value});
    }

    return(
        <div>
      <EmojiPickerPopup
      icon={income.icon}
      onSelect={(selectedIcon)=>handleChange('icon',selectedIcon)}></EmojiPickerPopup>

<Input value={income.name} onChange={({target})=>handleChange("name",target.value)} placeholder={"e.g., Salary, Freelance, Bonus"} type={"text"} label={"Income Source"}></Input>
<Input label={"Category"} value={income.categoryId} onChange={({target})=>handleChange("categoryId",target.value)} isSelect={true} options={categoryOptions}></Input>
<Input value={income.amount} onChange={({target})=>handleChange("amount",target.value)} label={"Amount"} placeholder={"e.g., 500.00"}></Input>
<Input value={income.date} onChange={({target})=>handleChange("date",target.value)} label={"Date"} type={"date"}></Input>
<div className="flex justify-end mt-6">
    <button onClick={()=>onAddIncome(income)} className="btn-primary">{isLoading?(<div className="flex justify-center items-center gap-2">
                    <LoaderCircle className="animate-spin w-5 h-5"></LoaderCircle>
                    <span>Please wait...</span>
                </div>):(<div>Add Income</div>)}</button>
</div>
        </div>
    )
}

export default AddIncomeForm;