import { useEffect, useState } from "react";
import { Label } from "recharts";
import EmojiPickerPopup from "./EmojiPickerPopUp";
import Input from "./Input";
import { Loader, LoaderCircle } from "lucide-react";


const AddExpenseForm=({onAddExpense,categories,isLoading})=>{
    const [expense,setExpense]=useState({
        name:'',
        amount:'',
        date:'',
        icon:'',
        categoryId:categories[0].categoryId
    })

    useEffect(()=>{
     if(categories.length>0){
        setExpense(value=>({
            ...value,categoryId:categories[0].id
        }))
     }

     setExpense(value=>({
       ...value,date:new Date().toISOString().split("T")[0]
     }))
    },[categories])

   const categoryOptions= categories.map(category=>({
        value:category.id,
        label:category.name,
    }))
    

    const handleChange=(key,value)=>{
        setExpense({...expense,[key]:value});
    }

    return(
        <div>
      <EmojiPickerPopup
      icon={expense.icon}
      onSelect={(selectedIcon)=>handleChange('icon',selectedIcon)}></EmojiPickerPopup>

<Input value={expense.name} onChange={({target})=>handleChange("name",target.value)} placeholder={"e.g., Salary, Freelance, Bonus"} type={"text"} label={"Expense Source"}></Input>
<Input label={"Category"} value={expense.categoryId} onChange={({target})=>handleChange("categoryId",target.value)} isSelect={true} options={categoryOptions}></Input>
<Input value={expense.amount} onChange={({target})=>handleChange("amount",target.value)} label={"Amount"} placeholder={"e.g., 500.00"}></Input>
<Input value={expense.date} onChange={({target})=>handleChange("date",target.value)} label={"Date"} type={"date"}></Input>
<div className="flex justify-end mt-6">
    <button onClick={()=>onAddExpense(expense)} className="btn-primary">{isLoading?(<div className="flex justify-center items-center gap-2">
                    <LoaderCircle className="animate-spin w-5 h-5"></LoaderCircle>
                    <span>Please wait...</span>
                </div>):(<div>Add Expense</div>)}</button>
</div>
        </div>
    )
}

export default AddExpenseForm;