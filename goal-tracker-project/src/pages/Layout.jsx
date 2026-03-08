import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

 export default function Layout(){
    return(
        <div>
            <Navbar/>
            <div className="container py-4">
                <Outlet/>
            </div>
        </div>
    )
 }