import {useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { ChevronDown, Loader, Search } from "lucide-react";
import axiousConfig from "../utils/axiousConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";


const Filter=()=>{
      useUser();
    const[type,setType]=useState("income")
    const[startDate,setStartDate]=useState(new Date().toISOString().split('T')[0]);
    const[endDate,setEndDate]=useState(new Date().toISOString().split('T')[0]);
    const[keyword,setKeyword]=useState("");
    const[sortField,setSortField]=useState("date");
    const[sortOrder,setSortOrder]=useState("asc");
    const[transaction,setTransactions]=useState([])
    const[loading,setLoading]=useState(false);

    const handleSearch=async(e)=>{
      e.preventDefault();
     console.log(type,startDate,endDate,keyword,sortField,sortOrder);
      try {
          setLoading(true)
          const response=await axiousConfig.post(API_ENDPOINTS.APPLY_FILTERS,{
            type,
            startDate,
            endDate,
            keyword,
            sortField,
            sortOrder
          }) 
          console.log(response.data)
          if(response.status==200){
            setTransactions(response.data)
          }
      } catch (error) {
         console.error("Failed to fetch transaction error",error.message);
         toast.error(error?.response?.data?.message||"Unable to fetch transaction")
      }finally{
         setLoading(false)
      }
    }

    return(<Dashboard activeMenu={"Filters"}>
      <div className="my-5 mx-auto">
         <div className="flex justify-between items-center mt-2 mb-4">
            <h2 className="text-2xl font-semibold">Filter Transaction</h2>
         </div>
         <div className="card p-4 mb-4">
           <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Select the filters</h5>
            </div> 
            <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
               <div className="relative">
                  <ChevronDown size={20} className="absolute top-9 right-2"></ChevronDown>
                  <label className="block text-sm font-medium mb-1" htmlFor="type">Type</label>
                  <select value={type} onChange={(e)=>setType(e.target.value)} id="type" className="w-full border rounded px-3 bg-white py-2 h-[42px] appearance-none">
                     <option value={"income"}>Income</option>
                     <option value={"expense"}>Expense</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="startdate">Start Date</label>
                  <input value={startDate} onChange={(e)=>setStartDate(e.target.value)} id="startdate" type="date" className="w-full border rounded px-3 py-2"></input>
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="enddate">Start Date</label>
                  <input value={endDate} onChange={(e)=>setEndDate(e.target.value)} id="enddate" type="date" className="w-full border rounded px-3 py-2"></input>
               </div>
                <div className="relative">
                  <ChevronDown size={20} className="absolute top-9 right-2"></ChevronDown>
                  <label className="block text-sm font-medium mb-1" htmlFor="sortfield">Sort Order</label>
                  <select value={sortField} onChange={(e)=>setSortField(e.target.value)} id="sortorder" className="w-full border rounded px-3 bg-white py-2 h-[42px] appearance-none">
                     <option value={"date"}>Date</option>
                     <option value={"amount"}>Amount</option>
                     <option value={"category"}>Category</option>
                  </select>
               </div>
               <div className="relative">
                  <ChevronDown size={20} className="absolute top-9 right-2"></ChevronDown>
                  <label className="block text-sm font-medium mb-1" htmlFor="sortorder">Sort Order</label>
                  <select value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)} id="sortorder" className="w-full border rounded px-3 bg-white py-2 h-[42px] appearance-none">
                     <option value={"asc"}>Ascending</option>
                     <option value={"desc"}>Descending</option>
                  </select>
               </div>
               <div className="sm:col-span-1 md:col-span-2 flex items-end">
                  <div className="w-full">
                  <label className="block text-sm font-medium mb-1" htmlFor="keyword">Search</label>
                  <input value={keyword} onChange={(e)=>setKeyword(e.target.value)} id="keyword" type="text" placeholder="Search..." className="w-full border rounded px-3 py-2"></input>
                  </div>
                    <button onClick={handleSearch} className="ml-2 mb-px p-2 bg-purple-800 hover:bg-purple-800 text-white rounded flex items-center justify-center cursor-pointer">
                  <Search></Search>
               </button>
               </div>
            </form>
         </div>
         <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
               <h5 className="text-lg font-semibold">Transacations</h5>
            </div>
          {transaction.length==0 && !loading?(<p className="text-gray-500">Select the filters and click apply to filter the transaction</p>):
          (loading?(<div className="flex flex-col justify-center items-center">
            <Loader className="animate-spin" size={50}></Loader>
            <h5 className="text-gray-500">Loading...</h5>
          </div>):(transaction.map((data)=>(
                     <TransactionInfoCard
                     key={data.id}
                     title={data.name}
                     icon={data.icon}
                     date={moment(data.date).format("Do MMM YYYY")}
                     amount={data.amount}
                     type={type}
                     hideDeleteBtn={true}
                     >
                     </TransactionInfoCard>
          )))
         
         )}
         </div>
      </div>
    </Dashboard>);
}

export default Filter;