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
import {ThreeCircles, ThreeDots} from "react-loader-spinner";
import {VideoMini} from "../../../components/common/homepage/VideoMini";
import InfiniteScroll from "react-infinite-scroll-component";
import {CommentPostBox} from "../../../components/common/comment/CommentPostBox";
import './index.css'
import {CommentBox} from "../../../components/common/comment/CommentBox";
import {userService} from "../../../api/user/user";
import {commentService} from "../../../api/user/comment";
import {VerticalCommentList} from "../../../components/common/comment/VerticalCommentList";
import {SubscribeButton} from "../../../components/common/button/SubscribeButton";
import {AddPlaylistPopup} from "../../../components/modal/AddPlaylistPopup";
import {AiOutlineDownload, AiOutlineLike} from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import {MdOutlineReportProblem} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {HlsVideoPlayer} from "../../../components/common/video/HlsVideoPlayer";
import {CreateVideoReportPopup} from "../../../components/common/report/CreateVideoReportPopup";
import {ImageUtils} from "../../../utils/images/ImageUtils";


const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;
const baseServerURL = `${process.env.REACT_APP_BASE_SERVER}`;
export default function VideoWatchPage() {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const user = authContext.user;
    const role = authContext.role ? authContext.role.replaceAll('"', '') : 'guest';

    const params = useParams();
    const videoId = params.id;

    const [videoList, setVideoList] = useState([]);
    const [currentVideo, setCurrentVideo] = useState({});
    const [currentVideoSrc, setCurrentVideoSrc] = useState('');
    const [currentChannel, setCurrentChannel] = useState({});
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const [refreshComments, setRefreshComments] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchVideoData = async (id) => {
        const result = await videoService.findVideoById(token, id);
        console.log(result.data);
        if (result.success) {
            setCurrentVideo(result.data.data);
            setLikeCount(result.data.data.likeCount);
            setDislikeCount(result.data.data.dislikeCount);
            setCommentCount(result.data.data.commentCount);
            setDescription(result.data.data.description);
            const videoSrc = await createVideoSrc(result.data.data.id);
            console.log('Video src is ', videoSrc);
            setCurrentVideoSrc(videoSrc);
            const fetchChannelResult = await userService.findUserById(result.data.data.publisher_id);
            if (fetchChannelResult.success) {
                console.log(fetchChannelResult.data.data);
                setCurrentChannel(fetchChannelResult.data.data);
            }

        }
    }

    const initVideoData = async () => {
        setLoading(true);
        if (token) {
            const result = await videoService.getRecommendVideos(token, {
                page: 1,
                pageSize: videoPerRequest
            })
            console.log(result.data.data)
            if (result.success) {
                setVideoList(result.data.data)
            }
        } else {
            const result = await videoService.fetchVideoList(token, {
                page: 1,
                pageSize: videoPerRequest
            })
            if (result.success) {
                if (result.data.count < videoPerRequest) {
                    setHasMore(false);
                }
                if (result.data.count > 0) {
                    setVideoList(result.data.data)
                }
            }
        }

        setLoading(false);

    }

    const fetchVideoDataList = async (page, pageSize) => {
        setLoading(true);
        if (token) {
            const result = await videoService.getRecommendVideos(token, {
                page: page,
                pageSize: pageSize
            })
            console.log(result.data.data)
            setLoading(false);
            if (result.success) {
                return result.data.data;
            } else {
                return [];
            }
        } else {
            const result = await videoService.fetchVideoList(token, {
                page: page,
                pageSize: pageSize
            })
            console.log(result.data.data)
            setLoading(false);
            if (result.success) {
                return result.data.data;
            } else {
                return [];
            }
        }

    }

    const initData = async (videoId) => {
        await fetchVideoData(videoId);
        initVideoData();
    }

    useEffect(() => {
        initData(params.id);
    }, [params.id]);

    const createVideoSrc = async (videoId) => {
        // console.log(`${baseAdminURL}/video/stream/${videoId}`);
        // if (user != null) {
        //     return `${baseAdminURL}/video/stream/${videoId}?userId=${user.id}`;
        // } else {
        //     return `${baseAdminURL}/video/stream/${videoId}`;
        // }
        const videoSrc = await videoService.getVideoSrc(videoId);
        if (videoSrc.success) {
            return  StringUtils.convertToHLSUrl(`${videoSrc.data.data}`);
        } else {
            return '';
        }
    }

    const videoPerRequest = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = async () => {
        console.log('Has more')
        setLoading(true);
        const result = await fetchVideoDataList(currentPage + 1, videoPerRequest);
        if (result.length > 0) {
            setVideoList(videoList => [...videoList, ...result]);
            setCurrentPage(currentPage => currentPage + 1);
            setHasMore(true);
        } else {
            setHasMore(false);
        }
        console.log(hasMore)
        setLoading(false);
    }

    const adjustSubscriberCount = (isAdded) => {
        if (isAdded) {
            return setCurrentChannel({
                ...currentChannel,
                subscriberCount: currentChannel.subscriberCount + 1
            })
        }

        return setCurrentChannel({
            ...currentChannel,
            subscriberCount: currentChannel.subscriberCount - 1
        })
    }

    return (
        <div className={"grid grid-cols-12"}>
            {/* Video watching + Comment List */}
            <div className={"col-start-1 col-span-11  lg:col-span-8 p-2"}>
                {/*<VideoPlayer videoStc={currentVideoSrc}/>*/}
                <div className={'w-full'}>
                    <HlsVideoPlayer width={1054} height={600} src={currentVideoSrc} videoId={currentVideo.id}/>
                </div>
                <div className={"video-info p-1 ml-3 flex flex-col justify-between"}>
                    <div className={"text-black font-bold text-sm md:text-xl mt-4 line-clamp-2"}>
                        {currentVideo.title}
                    </div>
                    <div className={"flex justify-between flex-col md:flex-row mt-4"}>
                        <div className={"flex flex-row items-center"}>
                            <div
                                onClick={(e) => {
                                    navigate(`/${role}/channel/${currentChannel.id}`);
                                }} 
                                className={'relative h-20 md:h-16 md:rounded-xl overflow-hidden'}>
                                <img src={ImageUtils.createImageSrcFromBufferWithDefaultIsAvatar(currentChannel?.avatar?.data)} className={"h-full w-full object-cover rounded-lg"}/>
                            </div>
                            <div className={'flex flex-col'}>
                                <span className={"inline-block ml-2 "}>
                                    <div className={"text-black text-md font-semibold flex items-center"}>
                                        {currentVideo.user_name || 'No name'}
                                    </div>
                                    <div className={"text-black/[0.7] text-sm"}>
                                        {StringUtils.formatNumber(currentChannel.subscriberCount)} subscribers
                                    </div>
                                </span>
                            </div>

                            <SubscribeButton
                                callback={adjustSubscriberCount}
                                channelId={currentVideo.publisher_id}
                                className={" ml-8 transition duration-300 leading-3 h-12"}/>
                        </div>
                        <div className={"float-right flex items-center gap-[10px]"}>
                            <div className={'float-right flex items-center'}>
                                <LikeButton
                                    count={likeCount}
                                    liked={currentVideo.liked}
                                    videoId={videoId}
                                    className={'rounded-2xl inline-flex items-center py-2 px-4 transition duration-300'}
                                />
                                <DislikeButton
                                    count={dislikeCount}
                                    disliked={currentVideo.disliked}
                                    videoId={videoId}
                                    className={'rounded-2xl inline-flex items-center py-2 px-4 transition duration-300'}
                                />
                            </div>

                            <AddPlaylistPopup/>
                            <CreateVideoReportPopup />
                            {/*<MyButton title={"Add to playlist"} icon={IMAGES.icon.addPlaylist} />*/}
                        </div>

                    </div>
                    <div className={"description mt-6 bg-gray-100 round-xl p-2"}>
                        <div className={"text-black text-md font-semibold  mb-3 "}>
                            <span className={"view-count"}>
                                {currentVideo.views} views
                            </span>
                            <span className={"posted-date ml-4"}>
                                {StringUtils.convertSeconds(currentVideo.postedSince)} ago
                            </span>
                        </div>
                        <DescriptionTextField description={description} line={1}/>
                    </div>

                    <div>
                        <div className={'comment-header'}>
                            {StringUtils.formatNumber(commentCount)} Comments
                        </div>
                        <div className={'comment-body'}>
                            <CommentPostBox onCommentPosted={() => {
                                setRefreshComments(prev => !prev)
                                setCommentCount(prev => prev + 1);
                            }} videoId={videoId}/>
                            <VerticalCommentList
                                videoId={videoId}
                                refreshComments={refreshComments}
                                onCommentDeleted={() => {
                                    setRefreshComments(prev => !prev)
                                    setCommentCount(prev => prev - 1);
                                }}/>
                        </div>
                    </div>
                </div>

            </div>

            {/* Recommend video list */}
            <div className={"hidden lg:flex flex-col lg:col-span-4 ml-8 overflow-y-visible"}>
                <div className={'flex flex-col w-[100%]'}>
                    <VideoVerticalList videos={videoList}/>
                </div>
                {loading && <div className={'flex justify-center'}>
                    <ThreeDots />
                </div>}
                <div className={'flex justify-center'}>
                    <button onClick={fetchMoreData}
                            className={'py-1 bg-black rounded-full px-4 ml-2 text-white hover:bg-white hover:text-black hover:border border-black '}>
                        Load more
                    </button>
                </div>
            </div>
        </div>
    );

}