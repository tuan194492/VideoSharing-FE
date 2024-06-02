import VideoUploadPage from "../pages/user/video/VideoUploadPage/VideoUploadPage";
import VideoWatchPage from "../pages/user/video/VideoWatchPage";
import {IMAGES} from "../utils/images/images";
import {UserVideoHomePage} from "../pages/user/homepage/UserVideoHomePage";
import {PlaylistSummary} from "../pages/user/playlist/PlaylistSummary";
import {PlaylistWatchDetail} from "../pages/user/playlist/PlaylistWatchDetail";
import { RiPlayList2Fill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import {BsFire, BsInfo} from "react-icons/bs";
import { LuClock2 } from "react-icons/lu";
import { AiOutlineLike } from "react-icons/ai";
import {ChannelDetail} from "../pages/user/channel/ChannelDetail";
import {GrChannel, GrUserManager} from "react-icons/gr";
import {MdAnalytics, MdManageAccounts, MdOutlineUnsubscribe} from "react-icons/md";
import {FaVideo} from "react-icons/fa6";
import {BiUser} from "react-icons/bi";
import {PiPlaylist} from "react-icons/pi";
import {ChannelManager} from "../pages/user/studio/channel/ChannelManager";
import {ChannelAnalytic} from "../pages/user/studio/analytic/ChannelAnalytic";
import {VideoManage} from "../pages/user/studio/video/VideoManage";
import {PlaylistManage} from "../pages/user/studio/playlist/PlaylistManage";
import {VideoSearchPage} from "../pages/user/video/VideoSearch/VideoSearchPage";
import {PlaylistSummaryV2} from "../pages/user/playlist/PlaylistSummaryV2";
import {LikedVideoPage} from "../pages/user/video/LikedVideo/LikedVideoPage";
import {SubscriptionHomePage} from "../pages/user/subscriptions/SubscriptionHomePage";
import {SubscriberManage} from "../pages/user/studio/subscriber/SubscriberManage";
import {HistoryVideoPage} from "../pages/user/video/HistoryPage/HistoryVideoPage";


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
        path: '/user/trending',
        element: <UserVideoHomePage/>,
        icon: <BsFire size={28}/>,
        subRoute: [],
        able: 1,
        isStudio: false
    },
    {
        title: 'Subscriptions',
        path: '/user/subscriptions',
        element: <SubscriptionHomePage />,
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
        path: '/user/watch-later',
        element: <PlaylistSummaryV2 />,
        icon: <LuClock2  size={28}/>,
        subRoute: [],
        able: 1,
        isStudio: false
    },
    {
        title: 'Liked',
        path: '/user/liked-video',
        element: <LikedVideoPage />,
        icon: <AiOutlineLike  size={28}/>,
        subRoute: [],
        able: 1,
        isStudio: false
    },
    {
        title: 'History',
        path: '/user/history',
        element: <HistoryVideoPage />,
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
    },
    {
        path: "/user/channel/:id",
        element: <ChannelDetail />
    },
    {
        path: "/user/search",
        element: <VideoSearchPage />
    },
]

export const userStudioRoute = [
    {
        title: 'Channel',
        path: '/user/studio/channel',
        element: <ChannelManager />,
        icon: <MdManageAccounts size={32} />,
        subRoute: [],
        able: 1,
        isStudio: true
    },
    {
        title: 'Analytic',
        path: '/user/studio/analytic',
        element: <ChannelAnalytic />,
        icon: <MdAnalytics size={32}/>,
        subRoute: [],
        able: 1,
        isStudio: true
    },
    {
        title: 'Video',
        path: '/user/studio/video-manage',
        element: <VideoManage />,
        icon: <FaVideo size={32}/>,
        subRoute: [],
        able: 1,
        isStudio: true
    },
    {
        title: 'Playlist',
        path: '/user/studio/playlist-manage',
        element: <PlaylistManage />,
        icon: <PiPlaylist size={32}/>,
        subRoute: [],
        able: 1,
        isStudio: true
    },
    {
        title: 'Subscriber',
        path: '/user/studio/subscriber-manage',
        element: <SubscriberManage />,
        icon: <BiUser size={32}/>,
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