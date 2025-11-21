import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiousConfig from "../utils/axiousConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import TransactionList from "../components/TransactionList";
import Modal from "../components/Modal";
import DeleteAlert from "../components/DeleteAlert";
import TransactionOverview from "../components/TransactionOverview";
import AddExpenseForm from "../components/AddExpenseForm";

const Expense=()=>{
      useUser();
    const [expenseData,setExpenseData]=useState([])
    const [expenseCategories,setExpenseCategories]=useState([])
    const [loading,setLoading]= useState(false);
    const [openAddExpenseModal,setOpenAddExpenseModal]=useState(false)
    const [openDeleteAlert,setOpenDeleteAlert]=useState({show:false,data:null})

    const fetchExpenseDetails=async()=>{
        if(loading) return;
        
        setLoading(true);

        try {
         const response= await axiousConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES)
            if(response.status==200){
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error("failed to fetch expense details", error);
            toast.error(error.response.data.message||"Failed to fetch expense details");
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchExpenseCategories();
        fetchExpenseDetails();
    },[])


    const fetchExpenseCategories=async()=>{
        try {
          const response=await axiousConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
          if(response.status==200){
            setExpenseCategories(response.data)
        
          }
        } catch (error) {
            console.error("Failed to fetch expense categories",error)
            toast.error(error.data?.message||"Failed to fetch expense categories")
        }
    }

    const handleAddExpense=async(expense)=>{
       const {name,amount,date,icon,categoryId}=expense;
    if(!name.trim()){
    toast.error("Enter expense source")
      return;
    }
    if(!amount|| isNaN(amount) || Number(amount)<=0){
    toast.error("Amount should be a valid number greater than 0")
      return;  
    }

       const todaysDate=new Date().toISOString().split("T")[0]

    if(date>todaysDate){
    toast.error("Date cannot be in future");
      return;   
    }

    try {
        setLoading(true)
        const response=await axiousConfig.post(API_ENDPOINTS.ADD_EXPENSE,{name,amount,date,icon,categoryId})
        if(response.status==201){
        toast.success("Expense Added successfully");
        setOpenAddExpenseModal(false);
        fetchExpenseDetails();
        }
    } catch (error) {
        console.error("Error on adding expense",error)
       toast.error(error?.data?.message||"Unable to add expense");
    }finally{
        setLoading(false)
    }
    }

    const handleDeleteExpense=async()=>{
       try {
        setLoading(true);
        const id=openDeleteAlert.data;
         const response=await axiousConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id))
        if(response.status==200){
            toast.success("Expense deleted successfully");
            setOpenDeleteAlert({status:false,data:null});
            fetchExpenseDetails();
        }
       } catch (error) {
        console.error("Error on deleting expense",error)
        toast.error(error?.data?.message||"Unable to delete expense");
       }finally{
        setLoading(false)
       } 
    }

    const handleDownloadExpenseDetails=async()=>{
        try {
            setLoading(true);
            const response=await axiousConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,{ responseType: "arraybuffer" })
            if(response.status==200){
              let fileName="expense_details.xlsx";
              const url=window.URL.createObjectURL(new Blob([response.data]))
              const link=document.createElement("a");
              link.href=url;
              link.setAttribute("download",fileName);
              document.body.appendChild(link);
              link.click();
              link.parentNode.removeChild(link);
              window.URL.revokeObjectURL(url);
               toast.success("expense data downloaded successfully")
            }
        } catch (error) {
            console.error("Error on downloading",error.message);
            toast.error(error?.data?.message||"Unable to download expense data")
        }finally{
            setLoading(false);
        }
    }

    const handleEmailExpenseDetails=async()=>{
        try {
            setLoading(true);
           const response=await axiousConfig.get(API_ENDPOINTS.EXPENSE_SEND_EMAIL);
        if(response.status==200){
            toast.success("Email sent successfully");
        } 
        } catch (error) {
            console.error("Error on sending email ",error.message);
            toast.error(error?.data?.message||"Unable to send email");
        }finally{
            setLoading(false);
        }
        

    }

    return(<Dashboard activeMenu={"Expense"}>
       <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
            <TransactionOverview transactions={expenseData} onAddTransaction={()=>setOpenAddExpenseModal(true)} transactionType={"expense"}></TransactionOverview>
        <TransactionList transactionData={expenseData} onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})} onDownload={handleDownloadExpenseDetails} onEmail={handleEmailExpenseDetails} isLoading={loading} transactionType={"expense"}></TransactionList>
        <Modal
        isOpen={openAddExpenseModal}
        onClose={()=>setOpenAddExpenseModal(false)}
        title={"Add Expense"}><AddExpenseForm onAddExpense={(data)=>handleAddExpense(data)} categories={expenseCategories} isLoading={loading}></AddExpenseForm>
        </Modal>
        <Modal isOpen={openDeleteAlert.show} onClose={()=>setOpenDeleteAlert({show:false,data:null})} title={"Delete Expense"}>
            <DeleteAlert content={"Are you sure you want to delete this expense details?"} onDelete={(id)=>handleDeleteExpense()} isLoading={loading}></DeleteAlert>
        </Modal>
        </div>
       </div>
    </Dashboard>);
}

export default Expense;