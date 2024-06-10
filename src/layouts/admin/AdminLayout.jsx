import {useState} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import {WrapperAll, WrapperContent} from "../../style/styled";
function getClassNameByCollapse(collapsed) {
    if (collapsed) {
        return 'left-[80px] w-[100%]';
    } else {
        return 'left-[235px] w-[90%]';
    }
}
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
                <div
                    className={'fixed top-[8%] h-[92%] py-[50px] px-[50px] overflow-auto bg-gray-50 ' + getClassNameByCollapse(collapsed)}>
                    <Outlet/>
                </div>
            </div>
        </WrapperAll>
    );
}
