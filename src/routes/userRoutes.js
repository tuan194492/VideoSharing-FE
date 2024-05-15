import VideoUploadPage from "../pages/user/video/VideoUploadPage/VideoUploadPage";
import VideoWatchPage from "../pages/user/video/VideoWatchPage";
import {IMAGES} from "../utils/images/images";
import {UserVideoHomePage} from "../pages/user/homepage/UserVideoHomePage";
import {PlaylistSummary} from "../pages/user/playlist/PlaylistSummary";
import {PlaylistWatchDetail} from "../pages/user/playlist/PlaylistWatchDetail";
import { RiPlayList2Fill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { LuClock2 } from "react-icons/lu";
import { AiOutlineLike } from "react-icons/ai";


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
        title: 'Trending',
        path: '/user/homepage',
        element: <UserVideoHomePage/>,
        icon: <BsFire size={28}/>,
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
        element: <PlaylistSummary />,
        icon: <RiPlayList2Fill size={28}/>,
        subRoute: [],
        able: 1,
        isStudio: false
    },
    {
        title: 'Watch Later',
        path: '/user/playlist',
        element: <PlaylistSummary />,
        icon: <LuClock2  size={28}/>,
        subRoute: [],
        able: 1,
        isStudio: false
    },
    {
        title: 'Liked',
        path: '/user/playlist',
        element: <PlaylistSummary />,
        icon: <AiOutlineLike  size={28}/>,
        subRoute: [],
        able: 1,
        isStudio: false
    },
    {
        title: 'History',
        path: '/user/history',
        element: <div/>,
        icon: <FaHistory size={28}/>,
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
    },
    {
        path: "/user/playlist/detail/:id",
        element: <PlaylistWatchDetail />
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