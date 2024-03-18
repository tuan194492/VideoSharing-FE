import {Outlet} from "react-router-dom";
import Navbar from "../../components/guest/Navbar";
import {WrapperAll, WrapperContent} from "../../style/styled";
import Sidebar from "../../components/guest/Sidebar";
import {useState} from "react";
export default function GuestLayout() {

    const [collapsed, setCollapsed] = useState(false);
    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    }
    return (
        <WrapperAll>
            <div className=''>
                <Navbar collapseAction={handleCollapsedChange}/>
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
