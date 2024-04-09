import VideoUploadPage from "../pages/user/video/VideoUploadPage/VideoUploadPage";
import VideoWatchPage from "../pages/user/video/VideoWatchPage";

export const userRoutes = [
    {
        path: "/user/video/create",
        element: <VideoUploadPage />
    },
    {
        path: "/user/video/detail",
        element: <VideoWatchPage />
    }
]