import {Outlet} from "react-router-dom";
import Navbar from "../../components/guest/Navbar";
import {WrapperAll} from "../../style/styled";
export default function GuestLayout() {
    return (
        <WrapperAll>
            <div className=''>
                <Navbar />
                <div className='fixed top-[8%] left-[235px] h-[92%] w-[85%] py-[50px] px-[50px] overflow-auto' >
                    <Outlet />
                </div>
            </div>
        </WrapperAll>
    );
}
