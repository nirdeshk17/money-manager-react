import moment  from "moment";
const incomeLineChartData=(transactions)=>{
    const grouped={};
    transactions.map((income)=>{
        const month=moment(income.date).format("DD MMM")

        if(!grouped[income.date]){
            grouped[income.date]={
                date:income.date,
                totalAmount:0,
                items:[],
                month:month
            }
        }
        grouped[income.date].totalAmount+=Number(income.amount);
        grouped[income.date].items.push(income)
    })
    return Object.values(grouped);
}

export default incomeLineChartData;