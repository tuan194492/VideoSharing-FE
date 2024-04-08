import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import VideoUploadPreview from "../../../components/user/video/VideoUploadPreview";
import VideoPlayer from "../../../components/common/video/VideoPlayer";
import VideoVerticalList from "../../../components/user/video/VideoVerticalList";
import {IMAGES} from "../../../utils/images/images";
import {LikeButton} from "../../../components/common/button/LikeButton";
import {DislikeButton} from "../../../components/common/button/DislikeButton";
import {MyButton} from "../../../components/common/button/MyButton";

export default function VideoWatchPage() {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const user = authContext.user;
    const [videoList, setVideoList] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);

    return (
        <div className={"grid grid-cols-12"}>
            {/* Video watching + Comment List */}
            <div className={"col-start-1 col-span-8 p-2"}>
                <VideoPlayer video={currentVideo}/>
                <div className={"video-info"}>
                    <div className={"title"}>
                        Nhạc Lofi Tâm Trạng - Nhạc Chill TikTok Nhẹ Nhàng Hay Nhất 2024 | Lofi Chill Tâm Trạng Buồn 2024
                    </div>
                    <div className={"video-info-bar"}>
                        <div className={"float-left flex"}>
                            <img src={IMAGES.icon.avatar} className={"rounded-2xl w-[8%] "} />
                            <span className={"inline-block ml-2"}>
                                <div className={"channel-name"}>
                                    2Am Lofi
                                </div>
                                <div className={"channel-subscriber-count"}>
                                    31.4K subscribers
                                </div>
                            </span>
                            <button
                                className={"rounded-2xl inline-flex items-center py-2 px-4 bg-red-500 hover:bg-red-600 text-white transition duration-300"}>Subscribe
                            </button>
                        </div>
                        <div className={"float-right flex gap-[10px]"}>
                            <LikeButton />
                            <DislikeButton />
                            <MyButton title={"Add to playlist"} icon={IMAGES.icon.addPlaylist} />
                        </div>
                    </div>
                    <div className={"description"}>

                    </div>
                </div>

            </div>

            {/* Recommend video list */}
            <div className={"col-span-4 ml-8"}>
                <VideoVerticalList videos={videoList}/>
            </div>
        </div>
    );

}