import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {StringUtils} from "../../../utils/string/StringUtils";
import {userService} from "../../../api/user/user";
import {IMAGES} from "../../../utils/images/images";
import {videoService} from "../../../api/user/video";
import {AuthContext} from "../../../context/AuthContext";
import {VideoMini} from "../../../components/common/homepage/VideoMini";
import {CgArrowRight, CgMoveRight} from "react-icons/cg";
import {AiOutlineArrowRight} from "react-icons/ai";
import {BsBoxArrowRight, BsPlay, BsPlayBtn} from "react-icons/bs";
import {FaCircleArrowRight} from "react-icons/fa6";
import {TbCircleArrowLeftFilled, TbCircleArrowRightFilled} from "react-icons/tb";
import {playlistService} from "../../../api/user/playlist";
import {PlayListMini} from "../../../components/common/playlist/PlayListMini";
import {ImageUtils} from "../../../utils/images/ImageUtils";
import {ReportPopup} from "../../../components/common/report/ReportPopup";
import {CreateVideoReportPopup} from "../../../components/common/report/CreateVideoReportPopup";
import {ChannelReportButton} from "../../../components/common/report/ChannelReportButton";
const defaultImage = 'https://www.frontsigns.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/Business-Branding-Ideas.jpg.webp';

const videoPerRequest = 8;
export const ChannelDetail = (props) => {
    const params = useParams();
    const channelId = params.id;
    const authContext = useContext(AuthContext);
    const token = authContext.token;

    const [channel, setChannel] = useState({
        avatar: ''
    });
    const [videoList, setVideoList] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);

    const fetchChannelData = async (channelId) => {
        const fetchChannelResult = await userService.findUserById(channelId);
        if (fetchChannelResult.success) {
            console.log(fetchChannelResult.data.data);
            setChannel(prev => fetchChannelResult.data.data);
            const fetchVideoData = await videoService.getVideoByPublisherId(token, channelId)
            if (fetchVideoData.success) {
                setVideoList(fetchVideoData.data.data)
            }

            const fetchPlaylistResult = await playlistService.getPublicPlaylistListByUser(channelId);
            if (fetchPlaylistResult.success) {
                setPlaylistList(fetchPlaylistResult.data);
            }
        }
    }

    const initData = async () => {
        await fetchChannelData(channelId);
    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <div className={'p-0 m-0'}>
            <div>
                <img className='w-[100%] h-[120px] sm:h-[160px] lg:h-[210px] bg-cover rounded-[16px]'
                     style={{background: `url(${channel?.brandingSettings?.image?.bannerExternalUrl || defaultImage})`}}/>
            </div>
            <div className='flex gap-x-5 items-center my-5 pb-4 border-b-2 border-gray-100'>
                <img className='rounded-[40px] w-12 h-12 md:w-16 md:h-16'
                     src={channel?.avatar?.data ? ImageUtils.createImageSrcFromBuffer(channel.avatar.data) : IMAGES.icon.avatar}/>
                <div className='flex flex-col'>
                    <h3 className='text-md md:text-xl font-medium tracking-wide'>{channel?.name}</h3>
                    <div className='flex flex-col'>
                    <span
                        className='text-[12px] md:text-[14px] tracking-wide font-[500] text-[#323232]'>@ {channel?.shortname || 'No shortname'}</span>
                        <span
                            className='text-[12px] md:text-[13px] tracking-wider -mt-1 font-[500] text-[#323232]'>{StringUtils.formatNumber(channel?.subscriberCount)} subscribers</span>
                    </div>
                </div>
                <div className={'ml-auto mr-2'}>
                    <ChannelReportButton channelId={channel.id} />
                </div>
            </div>
            <div className={'border-b-2 border-gray-100'}>
                <h4 className='text-[16px] text-[#585858] font-bold tracking-wider'>VIDEOS</h4>
                <div className='mt-3 gap-x-5 gap-y-3 grid sm:grid-cols-1 md:grid-cols-6 px-4 pt-2 pb-4 relative'>
                    {
                        videoList.map((item) => (
                            <VideoMini data={item} key={item.id}/>
                        ))
                    }
                        <TbCircleArrowLeftFilled className={'text-gray-300 hover:text-gray-400 transition-colors absolute left-[-15px] top-1/4 cursor-pointer'} size={32} />
                        <TbCircleArrowRightFilled className={'text-gray-300 hover:text-gray-400 transition-colors absolute right-[-10px] top-1/4 cursor-pointer'} size={32} />
                </div>
            </div>

            {
                playlistList.map((playlist) => (
                    <div className={'border-b-2 border-gray-100 mt-4'}>
                        <div className={'flex flex-row justify-start items-center gap-8'}>
                            <h4 className='text-[16px] text-[#585858] font-bold tracking-wider'>{playlist.title}</h4>
                            <div className={'flex flex-row justify-items-start items-center hover:bg-gray-200 cursor-pointer rounded-full gap-1 px-2'}>
                                <BsPlay/>
                                <h4 className='text-[16px] text-[#585858] font-extrabold tracking-wider'>Play all</h4>
                            </div>


                        </div>
                        <div className='mt-3 gap-x-5 gap-y-3 grid sm:grid-cols-1 md:grid-cols-6 px-4 relative pt-2 pb-4'>
                        {
                            playlist.Videos.map((item) => (
                                    <VideoMini data={item} key={item.id}/>
                                ))
                            }
                            {playlist.Videos.length > 7 &&
                            <>
                                <TbCircleArrowLeftFilled
                                className={'text-gray-300 hover:text-gray-400 transition-colors absolute left-[-15px] top-1/4 cursor-pointer'}
                                size={32}/>
                            <TbCircleArrowRightFilled
                                className={'text-gray-300 hover:text-gray-400 transition-colors absolute right-[-10px] top-1/4 cursor-pointer'}
                                size={32}/>
                            </>
                            }

                        </div>
                    </div>
                ))
            }

            <div className={'mt-4'}>
                <h4 className='text-[16px] mt-2 text-[#585858] font-bold tracking-wider'>PLAYLISTS</h4>
                <div className='mt-3 gap-x-5 gap-y-3 grid sm:grid-cols-1 md:grid-cols-6 px-4 relative mt-12 pt-2 pb-4'>
                    {
                        playlistList.map((playlist) => {
                            return <PlayListMini data={{
                                id: playlist.id
                            }}/>
                        })
                    }
                    {
                        playlistList.length > 7 && <>
                            <TbCircleArrowLeftFilled
                                className={'text-gray-300 hover:text-gray-400 transition-colors absolute left-[-15px] top-1/4 cursor-pointer'}
                                size={32}/>
                            <TbCircleArrowRightFilled
                                className={'text-gray-300 hover:text-gray-400 transition-colors absolute right-[-10px] top-1/4 cursor-pointer'}
                                size={32}/>
                        </>
                    }

                </div>
            </div>
        </div>
    )


}