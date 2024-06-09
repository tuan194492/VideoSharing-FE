import {useState} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import {WrapperAll, WrapperContent} from "../../style/styled";

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };
    return (
        <WrapperAll>
            <div className=''>
                <Navbar />
                <WrapperContent className='fixed top-[8%]'>
                    <Sidebar  menuCollapse = {collapsed} setMenuCollapse = {handleCollapsedChange} />
                </WrapperContent>
                <div className='fixed top-[8%] left-[235px] h-[92%] w-[85%] py-[50px] px-[50px] overflow-auto' >
                    <Outlet />
                </div>
            </div>
        </WrapperAll>
    );
}
