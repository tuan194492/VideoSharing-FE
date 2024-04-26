import {UserVideoHomePage} from "../pages/user/homepage/UserVideoHomePage";
import {IMAGES} from "../utils/images/images";
import VideoUploadPage from "../pages/user/video/VideoUploadPage/VideoUploadPage";
import VideoWatchPage from "../pages/user/video/VideoWatchPage";

export const guestRoutes = [
    {
        title: 'Home',
        path: '/guest',
        element: <UserVideoHomePage/>,
        icon: IMAGES.icon.home,
        subRoute: [],
        able: 1
    }
]