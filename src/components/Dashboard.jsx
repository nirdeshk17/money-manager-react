import { useContext } from "react";
import MenuBar from "./MenuBar"
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";


const Dashboard = ({children,activeMenu}) => {
    const user=useContext(AppContext)
    return(
        <div className="h-screen flex flex-col"><MenuBar activeMenu={activeMenu}/>
        {user&&(
            <div className="flex flex-1 overflow-hidden">
            <div className="max-[1080px]:hidden">
                <div><Sidebar activeMenu={activeMenu}></Sidebar></div>
            </div>
            <div className="grow mx-2 overflow-y-auto">{children}</div>
            </div>
        )}
        </div>

    )
}

export default Dashboard;