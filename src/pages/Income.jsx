import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiousConfig from "../utils/axiousConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import TransactionList from "../components/TransactionList";
import Modal from "../components/Modal";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import TransactionOverview from "../components/TransactionOverview";

const Income=()=>{
      useUser();
    const [incomeData,setIncomeData]=useState([])
    const [incomeCategories,setIncomeCategories]=useState([])
    const [loading,setLoading]= useState(false);
    const [openAddIncomeModal,setOpenAddIncomeModal]=useState(false)
    const [openDeleteAlert,setOpenDeleteAlert]=useState({show:false,data:null})

    const fetchIncomeDetails=async()=>{
        if(loading) return;
        
        setLoading(true);

        try {
         const response= await axiousConfig.get(API_ENDPOINTS.GET_ALL_INCOMES)
            if(response.status==200){
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error("failed to fetch income details", error);
            toast.error(error.response.data.message||"Failed to fetch income details");
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchIncomeCategories();
        fetchIncomeDetails();
    },[])


    const fetchIncomeCategories=async()=>{
        try {
          const response=await axiousConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
          if(response.status==200){
            setIncomeCategories(response.data)
        
          }
        } catch (error) {
            console.error("Failed to fetch income categories",error)
            toast.error(error.data?.message||"Failed to fetch income categories")
        }
    }

    const handleAddIncome=async(income)=>{
       const {name,amount,date,icon,categoryId}=income;
    if(!name.trim()){
    toast.error("Enter income source")
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
        const response=await axiousConfig.post(API_ENDPOINTS.ADD_INCOME,{name,amount,date,icon,categoryId})
        if(response.status==201){
        toast.success("Income Added successfully");
        setOpenAddIncomeModal(false);
        fetchIncomeDetails();
        }
    } catch (error) {
        console.error("Error on adding income",error)
       toast.error(error?.data?.message||"Unable to add income");
    }finally{
        setLoading(false)
    }
    }

    const handleDeleteIncome=async()=>{
       try {
        setLoading(true);
        const id=openDeleteAlert.data;
         const response=await axiousConfig.delete(API_ENDPOINTS.DELETE_INCOME(id))
        if(response.status==200){
            toast.success("Income deleted successfully");
            setOpenDeleteAlert({status:false,data:null});
            fetchIncomeDetails();
        }
       } catch (error) {
        console.error("Error on deleting income",error)
        toast.error(error?.data?.message||"Unable to delete income");
       }finally{
        setLoading(false)
       } 
    }

    const handleDownloadIncomeDetails=async()=>{
        try {
            setLoading(true);
            const response=await axiousConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,{ responseType: "arraybuffer" })
            if(response.status==200){
              let fileName="income_details.xlsx";
              const url=window.URL.createObjectURL(new Blob([response.data]))
              const link=document.createElement("a");
              link.href=url;
              link.setAttribute("download",fileName);
              document.body.appendChild(link);
              link.click();
              link.parentNode.removeChild(link);
              window.URL.revokeObjectURL(url);
               toast.success("Income data downloaded successfully")
            }
        } catch (error) {
            console.error("Error on downloading",error.message);
            toast.error(error?.data?.message||"Unable to download Income data")
        }finally{
            setLoading(false);
        }
    }

    const handleEmailIncomeDetails=async()=>{
        try {
            setLoading(true);
           const response=await axiousConfig.get(API_ENDPOINTS.INCOME_SEND_EMAIL);
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

    return(<Dashboard activeMenu={"Income"}>
       <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
            <TransactionOverview transactions={incomeData} onAddTransaction={()=>setOpenAddIncomeModal(true)} transactionType={"income"}></TransactionOverview>
        <TransactionList transactionData={incomeData} onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})} onDownload={handleDownloadIncomeDetails} onEmail={handleEmailIncomeDetails} isLoading={loading} transactionType={"income"}></TransactionList>
        <Modal
        isOpen={openAddIncomeModal}
        onClose={()=>setOpenAddIncomeModal(false)}
        title={"Add Income"}> <AddIncomeForm onAddIncome={(data)=>handleAddIncome(data)} categories={incomeCategories} isLoading={loading}></AddIncomeForm>
        </Modal>
        <Modal isOpen={openDeleteAlert.show} onClose={()=>setOpenDeleteAlert({show:false,data:null})} title={"Delete Income"}>
            <DeleteAlert content={"Are you sure you want to delete this income details?"} onDelete={(id)=>handleDeleteIncome()} isLoading={loading}></DeleteAlert>
        </Modal>
        </div>
       </div>
    </Dashboard>);
}

export default Income;