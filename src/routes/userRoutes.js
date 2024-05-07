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
        able: 1,
        isStudio: false
    },
    {
        title: 'Subscriptions',
        path: '/user/subscriptions',
        element: <div/>,
        icon: IMAGES.icon.subscription,
        subRoute: [],
        able: 1,
        isStudio: false
    },
    {
        title: 'Playlist',
        path: '/user/playlist',
        element: <div/>,
        icon: IMAGES.icon.playlist,
        subRoute: [],
        able: 1,
        isStudio: false
    },
    {
        title: 'History',
        path: '/user/history',
        element: <div/>,
        icon: IMAGES.icon.history,
        subRoute: [],
        able: 1,
        isStudio: false
    },
    {
        path: "/user/video/create",
        element: <VideoUploadPage />
    },
    {
        path: "/user/video/detail/:id",
        element: <VideoWatchPage />
    }
]

export const userStudioRoute = [
    {
        title: 'Customization',
        path: '/user/studio/customization',
        element: <div/>,
        icon: IMAGES.icon.history,
        subRoute: [],
        able: 1,
        isStudio: true
    },
    {
        title: 'Analytic',
        path: '/user/studio/analytic',
        element: <div/>,
        icon: IMAGES.icon.history,
        subRoute: [],
        able: 1,
        isStudio: true
    },
    {
        title: 'Video Manage',
        path: '/user/studio/video-manage',
        element: <div/>,
        icon: IMAGES.icon.history,
        subRoute: [],
        able: 1,
        isStudio: true
    },
    {
        title: 'Subscriber Manage',
        path: '/user/studio/subscriber-manage',
        element: <div/>,
        icon: IMAGES.icon.history,
        subRoute: [],
        able: 1,
        isStudio: true
    },
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