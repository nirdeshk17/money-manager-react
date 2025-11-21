import { useEffect, useState } from "react"
import LineChart from "./CustomLineChart";
import incomeLineChartData from "../utils/incomeLineChartData";
import { Plus } from "lucide-react";

const TransactionOverview=({transactions,onAddTransaction,transactionType})=>{


    const[chartData,setChartData]=useState([]);

    useEffect(()=>{
        const result=incomeLineChartData(transactions);
        setChartData(result);
    },[transactions])

    return(<div className="card">
        <div className="flex items-center justify-between">
            <div>
<h5 className="text-lg">{transactionType=="income"?("Income"):("Expense")} Overview</h5>
            <p className="text-xs text-gray-400 mt-0">
                Track your earnings over time and analyze your income trends.
            </p>
            </div> 
             <button className="btn-add flex items-center gap-1" onClick={()=>onAddTransaction()}>
                    <Plus size={15} className="text-lg"></Plus>
                    Add {transactionType=="income"?("Income"):("Expense")}
                </button>
        </div>
         <div className="mt-10 w-full h-72">
           <LineChart data={chartData}></LineChart>
        </div> 
    </div>)
}

export default TransactionOverview