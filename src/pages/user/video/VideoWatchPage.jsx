import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import VideoUploadPreview from "../../../components/user/video/VideoUploadPreview";
import VideoPlayer from "../../../components/common/video/VideoPlayer";
import VideoVerticalList from "../../../components/user/video/VideoVerticalList";

export default function VideoWatchPage() {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const user = authContext.user;
    const [videoList, setVideoList] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);

    return (
        <div className={"grid grid-cols-12"}>
            {/* Video watching + Comment List */}
            <div className={"col-start-1 col-span-8"}>
                <VideoPlayer video={currentVideo}/>
            </div>

            {/* Recommend video list */}
            <div className={"col-span-4"} >
                <VideoVerticalList videos={videoList} />
            </div>
        </div>
    );

}