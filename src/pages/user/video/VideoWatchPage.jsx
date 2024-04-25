import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import VideoUploadPreview from "../../../components/user/video/VideoUploadPreview";
import VideoPlayer from "../../../components/common/video/VideoPlayer";
import VideoVerticalList from "../../../components/user/video/VideoVerticalList";
import {IMAGES} from "../../../utils/images/images";
import {LikeButton} from "../../../components/common/button/LikeButton";
import {DislikeButton} from "../../../components/common/button/DislikeButton";
import {MyButton} from "../../../components/common/button/MyButton";
import {DescriptionTextField} from "../../../components/common/textfield/DescriptionTextField";
import {useParams} from "react-router-dom";
import async from "async";
import {videoService} from "../../../api/user/video";
import {StringUtils} from "../../../utils/string/StringUtils";
import {ThreeCircles} from "react-loader-spinner";
import {VideoMini} from "../../../components/common/homepage/VideoMini";
import InfiniteScroll from "react-infinite-scroll-component";
import {CommentPostBox} from "../../../components/common/comment/CommentPostBox";
import './index.css'
import {CommentBox} from "../../../components/common/comment/CommentBox";


const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;
export default function VideoWatchPage() {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const user = authContext.user;
    const params = useParams();
    const videoId = params.id;

    const [videoList, setVideoList] = useState([]);
    const [currentVideo, setCurrentVideo] = useState({});
    const [currentVideoSrc, setCurrentVideoSrc] = useState('');


    const fetchVideoData = async (id) => {
        const result = await videoService.findVideoById(token, id);
        console.log(result.data);
        if (result.success) {
            setCurrentVideo(result.data.data);
            setCurrentVideoSrc(createVideoSrc(result.data.data.id));
        }
    }

    const initVideoData = async () => {
        const result = await videoService.fetchVideoListAtHomePage(token, {
            page: 1,
            pageSize: videoPerRequest
        })
        console.log(result.data.data)
        if (result.success) {
            if (result.data.count < videoPerRequest) {
                setHasMore(false);
            }
            if (result.data.count > 0) {
                setVideoList(result.data.data)
            }
            console.log(videoList)
        }

    }

    const fetchVideoDataList = async (page, pageSize) => {
        const result = await videoService.fetchVideoListAtHomePage(token, {
            page: page,
            pageSize: pageSize
        })
        console.log(result.data.data)
        if (result.success) {
            return result.data.data;
        } else {
            return [];
        }
    }

    useEffect(() => {
        fetchVideoData(videoId);
        initVideoData();
    }, []);

    const createVideoSrc = (videoId) => {
        console.log(`${baseAdminURL}/video/stream/${videoId}`);
        if (user != null) {
            return `${baseAdminURL}/video/stream/${videoId}?userId=${user.id}`;
        } else {
            return `${baseAdminURL}/video/stream/${videoId}`;
        }
    }

    const videoPerRequest = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = async () => {
        console.log('Has more')
        const result = await fetchVideoDataList(currentPage + 1, videoPerRequest);
        if (result.length > 0) {
            setVideoList(videoList => [...videoList, ...result]);
            setCurrentPage(currentPage => currentPage + 1);
            setHasMore(true);
        } else {
            setHasMore(false);
        }
        console.log(hasMore)
    }

    return (
        <div className={"grid grid-cols-12"}>
            {/* Video watching + Comment List */}
            <div className={"col-start-1 col-span-8 p-2"}>
                <VideoPlayer videoStc={currentVideoSrc}/>
                <div className={"video-info p-1 ml-3 flex flex-col justify-between"}>
                    <div className={"title font-bold text-2xl line-clamp-2"}>
                        {currentVideo.title}
                    </div>
                    <div className={"flex items-center justify-between mt-2"}>
                        <div className={"float-left flex"}>
                            <img src={IMAGES.icon.avatar} className={"rounded-2xl w-[8%] "} />
                            <span className={"inline-block ml-2 "}>
                                <div className={"channel-name text-lg font-bold"}>
                                    {currentVideo.user_name || 'No name'}
                                </div>
                                <div className={"channel-subscriber-count"}>
                                    {StringUtils.formatNumber(currentVideo.subcriberCount)} subscribers
                                </div>
                            </span>
                            <button
                                className={"ml-8 h-[50%] rounded-2xl inline-flex items-center py-2 px-4 bg-red-500 hover:bg-red-600 text-white transition duration-300"}>Subscribe
                            </button>
                        </div>
                        <div className={"float-right flex gap-[10px] items-center"}>
                            <LikeButton count={currentVideo.likeCount} liked={currentVideo.liked}/>
                            <DislikeButton count={currentVideo.dislikeCount} disliked={currentVideo.disliked}/>
                            <MyButton title={"Add to playlist"} icon={IMAGES.icon.addPlaylist} />
                        </div>
                    </div>
                    <div className={"description mt-2 bg-gray-300 p-2"}>
                        <div className={"channel-name text-gray-700 text-sm mb-3 "}>
                            <span className={"view-count"}>
                                {currentVideo.views} views
                            </span>
                            <span className={"posted-date ml-4"}>
                                {StringUtils.convertSeconds(currentVideo.postedSince)} ago
                            </span>
                        </div>
                        <div className={"break-words"}>
                            {currentVideo.description}
                        </div>
                    </div>

                    <div>
                        <div className={'comment-header'}>
                            130 Comments
                        </div>
                        <div className={'comment-body'}>
                            <CommentPostBox />
                            <div className={'mt-4'}>
                                <CommentBox />
                                <CommentBox />

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Recommend video list */}
            <div className={"col-span-4 ml-8"}>
                <InfiniteScroll
                    dataLength={videoList.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<ThreeCircles />}
                    className={'flex justify-center'}
                >
                    <VideoVerticalList videos={videoList}/>
                </InfiniteScroll>

            </div>
        </div>
    );

}