import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {playlistService} from "../../../api/user/playlist";
import {toast} from "react-toastify";
import {AuthContext} from "../../../context/AuthContext";
import {videoService} from "../../../api/user/video";
import {userService} from "../../../api/user/user";
import VideoPlayer from "../../../components/common/video/VideoPlayer";
import {IMAGES} from "../../../utils/images/images";
import {StringUtils} from "../../../utils/string/StringUtils";
import {SubscribeButton} from "../../../components/common/button/SubscribeButton";
import {LikeButton} from "../../../components/common/button/LikeButton";
import {DislikeButton} from "../../../components/common/button/DislikeButton";
import {AddPlaylistPopup} from "../../../components/modal/AddPlaylistPopup";
import {DescriptionTextField} from "../../../components/common/textfield/DescriptionTextField";
import {CommentPostBox} from "../../../components/common/comment/CommentPostBox";
import {VerticalCommentList} from "../../../components/common/comment/VerticalCommentList";
import InfiniteScroll from "react-infinite-scroll-component";
import {ThreeCircles} from "react-loader-spinner";
import VideoVerticalList from "../../../components/user/video/VideoVerticalList";
import {VideoMini} from "../../../components/common/video/VideoMini";
import {MdLock, MdLoop, MdOutlineDelete, MdPrivateConnectivity, MdPublic} from "react-icons/md";
import {GiPrivate} from "react-icons/gi";
import {SiPrivateinternetaccess} from "react-icons/si";
import {BsDot, BsPlay} from "react-icons/bs";
import {HiXMark} from "react-icons/hi2";
import {GrCirclePlay, GrGooglePlay} from "react-icons/gr";
import {BiMoviePlay, BiShuffle} from "react-icons/bi";
import {FiDelete} from "react-icons/fi";
import {HlsVideoPlayer} from "../../../components/common/video/HlsVideoPlayer";

const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;
const baseServerURL = `${process.env.REACT_APP_BASE_SERVER}`;

export const PlaylistWatchDetail = (props) => {
    const params = useParams();
    const playlistId = params.id;
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const user = authContext.user;
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [videoList, setVideoList] = useState([]);
    const [playlist, setPlaylist] = useState({
        title: '',
        description: '',
        status: 0
    });
    const [currentVideo, setCurrentVideo] = useState({});
    const [currentVideoSrc, setCurrentVideoSrc] = useState('');
    const [currentChannel, setCurrentChannel] = useState({});
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [description, setDescription] = useState('');
    const [hasMore, setHasMore] = useState(false);
    const [refreshComments, setRefreshComments] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const navigate = useNavigate();
    const fetchMoreData = async () => {

    }

    const onChangeVideo = async (video) => {
        console.log('aaa')
        await fetchVideoData(video.id);
        setCurrentVideoIndex(videoList.indexOf(video))
    }

    const fetchPlaylistData = async () => {
        const result = await playlistService.getPlaylistDetail(token, playlistId);
        console.log(result);
        if (result.success) {
            console.log(result.data);
            console.log((new Date()).getTime())
            console.log(((new Date()).getTime() - new Date(result.data.data.createdAt)) / 1000)
            console.log(result.data.data.Videos);
            if (result.data.data.Videos.length > 0) {
                setVideoList([...result.data.data.Videos])
                console.log(result.data.data.Videos[0])
                await fetchVideoData(result.data.data.Videos[0].id);
            }
            return setPlaylist({
                ...result.data.data,
                postedSince: ((new Date()).getTime() - new Date(result.data.data.createdAt)) / 1000
            });
        }
        toast.error(result.message);
    }

    const initData = async () => {
        await fetchPlaylistData();
    }

    useEffect(() => {
        initData();
    }, []);



    const fetchVideoData = async (id) => {
        console.log(id)
        const result = await videoService.findVideoById(token, id);
        console.log(result.data);
        if (result.success) {
            setCurrentVideo(result.data.data);
            setLikeCount(result.data.data.likeCount);
            setDislikeCount(result.data.data.dislikeCount);
            setDescription(result.data.data.description);
            setCurrentVideoSrc(await createVideoSrc(result.data.data.id));
            setCommentCount(result.data.data.commentCount);
            const fetchChannelResult = await userService.findUserById(result.data.data.publisher_id);
            if (fetchChannelResult.success) {
                console.log(fetchChannelResult.data.data);
                setCurrentChannel(fetchChannelResult.data.data);
            }
        }
    }

    const createVideoSrc = async (videoId) => {
        // console.log(`${baseAdminURL}/video/stream/${videoId}`);
        // if (user != null) {
        //     return `${baseAdminURL}/video/stream/${videoId}?userId=${user.id}`;
        // } else {
        //     return `${baseAdminURL}/video/stream/${videoId}`;
        // }
        const videoSrc = await videoService.getVideoSrc(videoId);
        if (videoSrc.success) {
            return `${baseServerURL}${videoSrc.data.data}`;
        } else {
            return '';
        }
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

    const togglePlaylistLoop = (e) => {

    }

    const togglePlaylistShuffle = (e) => {

    }


    return (
        <div className={"grid grid-cols-12"}>
            {/* Video watching + Comment List */}
            <div className={"col-start-1 col-span-11 lg:col-span-8 p-2"}>
                {/*<VideoPlayer videoStc={currentVideoSrc}/>*/}
                <div>
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
                                    navigate(`/user/channel/${currentChannel.id}`);
                                }}
                                className={'relative h-20 md:h-16 md:rounded-xl overflow-hidden'}>
                                <img src={IMAGES.icon.avatar} className={"h-full w-full object-cover rounded-lg"}/>
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
                                    videoId={currentVideo.id}
                                    className={'rounded-2xl inline-flex items-center py-2 px-4 transition duration-300'}
                                />
                                <DislikeButton
                                    count={dislikeCount}
                                    disliked={currentVideo.disliked}
                                    videoId={currentVideo.id}
                                    className={'rounded-2xl inline-flex items-center py-2 px-4 transition duration-300'}
                                />
                            </div>

                            <AddPlaylistPopup/>
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
                            <CommentPostBox
                                onCommentPosted={() => {
                                    setRefreshComments(prev => !prev)
                                    setCommentCount(prev => prev + 1);
                                }}
                                videoId={currentVideo.id}/>
                            <VerticalCommentList videoId={currentVideo.id}
                                                 refreshComments={refreshComments}
                                                 onCommentDeleted={() => {
                                                     setRefreshComments(prev => !prev)
                                                     setCommentCount(prev => prev - 1);
                                                 }}/>
                        </div>
                    </div>
                </div>

            </div>

            <div className={"col-span-4 hidden lg:flex flex-col border-gray-300 box-border border-[1px] rounded-[12px] relative md:max-h-[70vh] "}>
                <div className={'pt-[12px] pr-[6px] pb-[0px] pl-[16px] border-b-2 pb-4'}>
                    <div className={'text-black text-2xl font-semibold line-clamp-2 mt-2'}>
                        Playlist: {playlist.title}
                    </div>
                    <button className={'absolute right-[5%] top-7'}>
                        <HiXMark size={28}/>
                    </button>
                    <div className={'flex flex-row mt-3'}>
                        <div className={'flex text-black/[0.7] text-sm bg-gray-200 px-2 py-[4px] rounded-[4px] gap-1 '}>
                            {playlist.status === 'PUBLIC' ? <MdPublic size={16}/> : <MdLock size={16}/>}
                            <span>
                                {playlist.status === 'PUBLIC' ? 'Public' : 'Private'}
                            </span>
                        </div>
                        <div className={'flex text-black/[0.7] text-sm px-2 py-[4px]'}>
                            <div>
                                {playlist.User?.name}
                            </div>
                            <BsDot size={16}/>
                            <div>
                                {currentVideoIndex + 1} / {videoList.length}
                            </div>
                        </div>
                    </div>
                    <div className={'mt-4 flex flex-row justify-items-start gap-4 pb-2'}>
                        <button
                            className={'hover:bg-gray-100'}
                            onClick={togglePlaylistLoop}
                        >
                            <MdLoop size={28}/>
                        </button>
                        <button
                            className={'hover:bg-gray-100'}
                            onClick={togglePlaylistShuffle}
                        >
                            <BiShuffle size={28}/>
                        </button>
                    </div>
                </div>
                <div className={'flex flex-col gap-2 overflow-y-scroll mt-2'}>
                    {videoList &&
                        videoList.map(((video, index) => {
                            if (video.id === currentVideo.id) {
                                return <div
                                    className={'flex flex-row justify-center items-center bg-gray-200 hover:bg-gray-200 gap-1 relative'}>
                                    <div className={'w-[5%] flex items-center justify-center'}>
                                        <BsPlay size={28}/>
                                    </div>
                                    <VideoMini
                                        className={'p-0.5 w-full'}
                                        data={video}
                                        onClick={e => {
                                            // Do Nothing
                                        }}
                                    />
                                    <MdOutlineDelete size={20} color={'red'} className={'opacity-0 top-[50%] right-4 cursor-pointer'}/>
                                </div>

                            }
                            return <div className={'flex flex-row justify-center items-center hover:bg-gray-100 gap-1'}>
                                <div className={'w-[5%] flex items-center justify-center'}>
                                    {index + 1}
                                </div>
                                <VideoMini
                                    className={'p-0.5 w-full'}
                                    data={video}
                                    onClick={e => onChangeVideo(video)}
                                />
                                <MdOutlineDelete size={20} color={'red'} className={' opacity-0 top-[50%] right-4 cursor-pointer'}/>
                            </div>
                        }))
                    }
                </div>

            </div>
        </div>
    );
}