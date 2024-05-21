import {useParams} from "react-router-dom";
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
import {MdLock, MdLoop, MdPrivateConnectivity, MdPublic} from "react-icons/md";
import {GiPrivate} from "react-icons/gi";
import {SiPrivateinternetaccess} from "react-icons/si";
import {BsDot, BsPlay} from "react-icons/bs";
import {HiXMark} from "react-icons/hi2";
import {GrCirclePlay, GrGooglePlay} from "react-icons/gr";
import {BiMoviePlay, BiShuffle} from "react-icons/bi";

const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

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
            setCurrentVideoSrc(createVideoSrc(result.data.data.id));
            const fetchChannelResult = await userService.findUserById(result.data.data.publisher_id);
            if (fetchChannelResult.success) {
                console.log(fetchChannelResult.data.data);
                setCurrentChannel(fetchChannelResult.data.data);
            }
        }
    }

    const createVideoSrc = (videoId) => {
        console.log(`${baseAdminURL}/video/stream/${videoId}`);
        if (user != null) {
            return `${baseAdminURL}/video/stream/${videoId}?userId=${user.id}`;
        } else {
            return `${baseAdminURL}/video/stream/${videoId}`;
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
                                    {StringUtils.formatNumber(currentChannel.subscriberCount)} subscribers
                                </div>
                            </span>
                            <SubscribeButton
                                callback={adjustSubscriberCount}
                                channelId={currentVideo.publisher_id}
                                className={"ml-8 h-[50%] rounded-2xl inline-flex items-center py-2 px-4 text-white transition duration-300"}/>
                        </div>
                        <div className={"float-right flex gap-[10px] items-center"}>
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
                            <AddPlaylistPopup videoId={currentVideo.id}
                            />
                            {/*<MyButton title={"Add to playlist"} icon={IMAGES.icon.addPlaylist} />*/}
                        </div>
                    </div>
                    <div className={"description mt-2 bg-gray-300 p-2"}>
                        <div className={"channel-name text-gray-700 text-md mb-3 "}>
                            <span className={"view-count"}>
                                {currentVideo.views} views
                            </span>
                            <span className={"posted-date ml-4"}>
                                {StringUtils.convertSeconds(currentVideo.postedSince)} ago
                            </span>
                        </div>
                        <DescriptionTextField description={description} line={2}/>
                    </div>

                    <div>
                        <div className={'comment-header'}>
                            {StringUtils.formatNumber(currentVideo.commentCount)} Comments
                        </div>
                        <div className={'comment-body'}>
                            <CommentPostBox videoId={currentVideo.id}/>
                            <VerticalCommentList videoId={currentVideo.id} />
                        </div>
                    </div>
                </div>

            </div>

            <div className={"col-span-4 flex flex-col border-gray-300 box-border border-[1px] rounded-[12px] relative"}>
                <div className={'pt-[12px] pr-[6px] pb-[0px] pl-[16px] border-b-2 pb-4'}>
                    <div className={'text-black text-2xl font-semibold line-clamp-2 mt-2'}>
                        Playlist: {playlist.title}
                    </div>
                    <button className={'absolute right-[5%] top-7'}>
                        <HiXMark size={28}/>
                    </button>
                    <div className={'flex flex-row mt-3'}>
                        <div className={'flex text-black/[0.7] text-sm bg-gray-200 px-2 py-[4px] rounded-[4px] gap-1 '}>
                            {playlist.status === 'PUBLIC' ? <MdPublic size={16}/>  : <MdLock size={16}/> }
                            <span>
                                {playlist.status === 'PUBLIC' ? 'Public'  : 'Private' }
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
                        videoList.map(video => {
                            if (video.id === currentVideo.id) {
                                return <div className={'flex flex-row justify-center items-center bg-gray-200 hover:bg-gray-200 gap-1'}>
                                    <div className={'w-[5%] flex items-center justify-center'}>
                                        <BsPlay size={28}/>
                                    </div>
                                    <VideoMini
                                        className={'p-0.5 w-full'}
                                        data={video}/>
                                </div>

                            }
                            return <div className={'flex flex-row justify-center items-center hover:bg-gray-100 gap-1'}>
                                <div className={'w-[5%] flex items-center justify-center'}>
                                    {video.id}
                                </div>
                                <VideoMini
                                    className={'p-0.5 w-full'}
                                    data={video}
                                    onClick={e => onChangeVideo(video)}
                                />
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
    );
}