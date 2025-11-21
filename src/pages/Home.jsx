import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import InfoCard from "../components/InfoCard";
import { Coins, Wallet, WalletCards } from "lucide-react";
import addThousandsSeparator from "../utils/thousandsSeperator";
import { useNavigate } from "react-router-dom";
import axiousConfig from "../utils/axiousConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransaction";
import FinanceOverview from "../components/FinanceOverview";
import Transacation from "../components/Transaction";

const Home=()=>{
    useUser();

const navigate=useNavigate();
const [dashboardData,setDashboardData]=useState([]);
const [loading,setLoading]=useState(false);

const fetchDashboardData=async()=>{
   
    if(loading)return;

    setLoading(true)

    try {
      
        const response=await axiousConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
        if(response.status==200){
            setDashboardData(response.data);
            console.log(response.data)
        }
    } catch (error) {
        console.error("Something went wrong while fetching dashboard data",error?.message);
        toast.error(error?.response?.data?.message||"Something went wrong");
    }finally{
        setLoading(false);
    }
}

useEffect(()=>{
    fetchDashboardData();
},[])

    return(<div>
       <Dashboard activeMenu={"Dashboard"}>
        <div className="my-5 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Recent transaction */}
               <InfoCard
               icon={<WalletCards></WalletCards>}
               label={"Total Balance"}
               value={addThousandsSeparator(dashboardData?.totalBalance)}
               color={"bg-purple-800"}
               ></InfoCard>

                 <InfoCard
               icon={<Wallet></Wallet>}
               label={"Total Income"}
               value={addThousandsSeparator(dashboardData?.totalIncome)}
               color={"bg-green-800"}
               ></InfoCard>

                 <InfoCard
               icon={<Coins></Coins>}
               label={"Total Expense"}
               value={addThousandsSeparator(dashboardData?.totalExpense)}
               color={"bg-red-800"}
               ></InfoCard>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <RecentTransactions transactions={dashboardData?.recentTransactions} onMore={()=>navigate("/expense")}></RecentTransactions>
                <FinanceOverview totalBalance={dashboardData?.totalBalance} totalExpense={dashboardData?.totalExpense} totalIncome={dashboardData?.totalIncome}></FinanceOverview>
                <Transacation title={"Recent Expenses"} transaction={dashboardData?.recent5Expenses||[]} onMore={()=>navigate("/expense")} type={"expense"}></Transacation>
                <Transacation title={"Recent Incomes"} transaction={dashboardData?.recent5Incomes||[]} onMore={()=>navigate("/income")} type={"income"}></Transacation>
                {/* Income transaction */}
            </div>
        </div>
       </Dashboard>
    </div>);
}

export default Home;