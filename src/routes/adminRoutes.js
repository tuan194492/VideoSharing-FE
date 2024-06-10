import {IMAGES} from "../utils/images/images";
import {BiSolidFlag} from "react-icons/bi";
import {DashBoardSummary} from "../pages/admin/dashboard/DashBoardSummary";
import {ReportManage} from "../pages/admin/report/ReportManage";
import {UserManagement} from "../pages/admin/user/UserManagement";
export const adminRoute = [
    {
        title: 'Dashboard',
        path: '/admin/dashboard',
        element: <DashBoardSummary/>,
        icon: IMAGES.icon.table,
        subRoute: [],
        able : 1
    },
    {
        title: 'User',
        path: '/admin/user/',
        icon: IMAGES.icon.personal,
        element: <UserManagement />,
        subRoute: [],
        able : 1
    },
    {
        title: 'Report',
        path: '/admin/report',
        icon: <BiSolidFlag size={28}/>,
        subRoute: [],
        element: <ReportManage />,
        able : 1
    },
]

export const adminExtraRoute = [
    {
        path: '/admin/post/:id',
        element: <div />
    }
]