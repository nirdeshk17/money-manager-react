import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";


const TransactionList=({transactionData,onDelete,onDownload,onEmail,isLoading,transactionType})=>{

    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{transactionType=="income"?("Income"):("Expense")} Sources</h5>
                <div className="flex items-center justify-end gap-2]">
                    <button className="card-btn m-2" onClick={onEmail}>
                    {isLoading?(<div className="flex justify-center items-center gap-2">
                    <LoaderCircle className="animate-spin w-5 h-5"></LoaderCircle>
                    <span>Please wait...</span>
                </div>):( <div className="flex items-center">
                        <Mail size={18} className="text-green-500 mr-2"></Mail>
                        Mail
                        </div> )}
                    
                    </button>
                    <button className="card-btn m-2" onClick={onDownload}>
                        {isLoading?(<div className="flex justify-center items-center gap-2">
                    <LoaderCircle className="animate-spin w-5 h-5"></LoaderCircle>
                    <span>Please wait...</span>
                </div>):(<div className="flex items-center">
                        <Download size={18} className="text-green-500 mr-2"></Download>
                        Download
                        </div> )}
                        
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* display the incomes */}
              {transactionData?.map((tranaction)=>(
                <TransactionInfoCard key={tranaction.id} title={tranaction.name} amount={tranaction.amount} icon={tranaction.icon} date={moment(tranaction.date).format("Do MMM YYYY")} type={transactionType} onDelete={()=>onDelete(tranaction.id)}></TransactionInfoCard>
              ))}
            </div>
        </div>
    )
}

export default TransactionList;