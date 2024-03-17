import AdminLayout from "../layouts/admin/AdminLayout";
import GuestLayout from "../layouts/guest/GuestLayout";
import UserLayout from "../layouts/user/UserLayout";
import UserLogin from "../pages/user/auth/UserLogin";
import UserRegister from "../pages/user/auth/UserRegister";
import {AdminLogin} from "../pages/admin/login/AdminLogin";

const admin = [], user = [], guest = [];
export const routes = [
    {
        path: "/admin",
        element: <AdminLayout />,
        children: admin
    },
    {
        path: "/admin/auth",
        element: <AdminLogin />,
        children: admin
    },
    {
        path: "/user",
        element: <UserLayout />,
        children: user
    },
    {
        path: "/user/login",
        element: <UserLogin />,
        children: user
    },
    {
        path: "/user/register",
        element: <UserRegister />,
        children: user
    },
    {
        path: "/guest",
        element: <GuestLayout />,
        children: guest
    }
];