import {Outlet} from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import {WrapperAll, WrapperContent} from "../../style/styled";
import Sidebar from "../../components/user/Sidebar";
import {useState} from "react";

function getClassNameByCollapse(collapsed) {
    if (collapsed) {
        return 'left-[55px]';
    } else {
        return 'left-[235px]';
    }
}

export default function UserLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    }
    return (
        <WrapperAll>
            <div className=''>
                <Navbar />
                <WrapperContent className='fixed top-[8%]'>
                    <Sidebar  menuCollapse = {collapsed} setMenuCollapse = {handleCollapsedChange} />
                </WrapperContent>
                <div className={'fixed top-[8%] h-[92%] w-[85%] py-[50px] px-[50px] overflow-auto ' + getClassNameByCollapse(collapsed)} >
                    <Outlet />
                </div>
            </div>
        </WrapperAll>
    );
}
