import VideoUploadPage from "../pages/user/video/VideoUploadPage/VideoUploadPage";
import VideoWatchPage from "../pages/user/video/VideoWatchPage";
import {IMAGES} from "../utils/images/images";
import {UserVideoHomePage} from "../pages/user/homepage/UserVideoHomePage";


export const userRoutes = [
    {
        title: 'Home',
        path: '/user/homepage',
        element: <UserVideoHomePage/>,
        icon: IMAGES.icon.home,
        subRoute: [],
        able: 1
    },
    {
        title: 'Subscriptions',
        path: '/user/subscriptions',
        element: <div/>,
        icon: IMAGES.icon.subscription,
        subRoute: [],
        able: 1
    },
    {
        title: 'Playlist',
        path: '/user/playlist',
        element: <div/>,
        icon: IMAGES.icon.playlist,
        subRoute: [],
        able: 1
    },
    {
        title: 'History',
        path: '/user/history',
        element: <div/>,
        icon: IMAGES.icon.history,
        subRoute: [],
        able: 1
    },
    {
        path: "/user/video/create",
        element: <VideoUploadPage />
    },
    {
        path: "/user/video/detail",
        element: <VideoWatchPage />
    }
]

export const userFooterRoute = [
    {
        title: 'Setting',
        path: '/user/setting',
        element: <div/>,
        icon: IMAGES.icon.setting,
        subRoute: [],
        able: 1
    },
];