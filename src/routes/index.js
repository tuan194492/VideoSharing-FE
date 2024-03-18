import AdminLayout from "../layouts/admin/AdminLayout";
import GuestLayout from "../layouts/guest/GuestLayout";
import UserLayout from "../layouts/user/UserLayout";
import UserLogin from "../pages/user/auth/UserLogin";
import UserRegister from "../pages/user/auth/UserRegister";
import {AdminLogin} from "../pages/admin/login/AdminLogin";
import {userRoutes} from "./userRoutes";

const admin = [], user = [], guest = [];
userRoutes.map((route) => {
    user.push(route)
})

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
        element: <UserLogin />
    },
    {
        path: "/user/register",
        element: <UserRegister />
    },
    {
        path: "/guest",
        element: <GuestLayout />,
        children: guest
    }
];