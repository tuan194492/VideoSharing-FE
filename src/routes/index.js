import AdminLayout from "../layouts/admin/AdminLayout";
import GuestLayout from "../layouts/guest/GuestLayout";
import UserLayout from "../layouts/user/UserLayout";
import UserLoginPage from "../pages/user/auth/UserLoginPage";
import UserRegisterPage from "../pages/user/auth/UserRegisterPage";
import {AdminLoginPage} from "../pages/admin/login/AdminLoginPage";
import {userRoutes, userStudioRoute} from "./userRoutes";
import {guestRoutes} from "./guestRoutes";
import UserStudioLayout from "../layouts/user/UserStudioLayout";

const admin = [], user = [], guest = [], userStudio = [];
userRoutes.map((route) => {
    user.push(route)
})

userStudioRoute.map((route) => {
    userStudio.push(route)
})
guestRoutes.map((route) => {
    guest.push(route)
})

export const routes = [
    {
        path: "/admin",
        element: <AdminLayout />,
        children: admin
    },
    {
        path: "/admin/auth",
        element: <AdminLoginPage />,
        children: admin
    },
    {
        path: "/user/studio",
        element: <UserStudioLayout />,
        children: userStudio
    },
    {
        path: "/user",
        element: <UserLayout />,
        children: user
    },
    {
        path: "/user/login",
        element: <UserLoginPage />
    },
    {
        path: "/user/register",
        element: <UserRegisterPage />
    },
    {
        path: "/guest",
        element: <GuestLayout />,
        children: guest
    }
];