import logo from './logo.png';
import login_bg from './login-bg.png';
import { Coins, FunnelPlus, Icon, LayoutDashboard, List, Wallet } from 'lucide-react';


export const assets={
    logo,
    login_bg
}


export const SIDE_BAR_DATA=[
    {
        id:"01",
        title:"Dashboard",
        link:"/dashboard",
        icon:LayoutDashboard
    },
    {
        id:"02",
        title:"Category",
        link:"/category",
        icon:List
    },
    {
        id:"03",
        title:"Income",
        link:"/income",
        icon:Wallet
    },
    {
        id:"04",
        title:"Expense",
        link:"/expense",
        icon:Coins,
    },
    {
        id:"05",
        title:"Filters",
        link:"/filters",
        icon:FunnelPlus,
    }
];