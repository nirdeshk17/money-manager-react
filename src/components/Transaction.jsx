import { ArrowRight } from "lucide-react"
import TransactionInfoCard from "./TransactionInfoCard"
import moment from "moment"

const Transacation=({transaction,onMore,type,title})=>{
    return (
        <div className="card rounded-2xl">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{title}</h5>
                <button className="card-btn flex items-center gap-2" onClick={onMore}>
                    More <ArrowRight className="text-base" size={15}></ArrowRight>
                </button>
            </div>
            <div className="mt-6">
                {transaction?.slice(0,5)?.map(item=>(
                    <TransactionInfoCard
                    key={item.id}
                    title={item.name}
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM YYYY")}
                    amount={item.amount}
                    type={type}
                    hideDeleteBtn={true}
                    ></TransactionInfoCard>
                ))}
            </div>
        </div>
    )
}

export default Transacation;