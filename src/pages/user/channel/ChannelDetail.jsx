import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {StringUtils} from "../../../utils/string/StringUtils";
import {userService} from "../../../api/user/user";
import {IMAGES} from "../../../utils/images/images";
import {videoService} from "../../../api/user/video";
import {AuthContext} from "../../../context/AuthContext";
import {VideoMini} from "../../../components/common/homepage/VideoMini";
const defaultImage = 'https://www.frontsigns.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/Business-Branding-Ideas.jpg.webp';

const videoPerRequest = 8;
export const ChannelDetail = (props) => {
    const params = useParams();
    const channelId = params.id;
    const authContext = useContext(AuthContext);
    const token = authContext.token;

    const [channel, setChannel] = useState();
    const [videoList, setVideoList] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);

    const fetchChannelData = async (channelId) => {
        const fetchChannelResult = await userService.findUserById(channelId);
        if (fetchChannelResult.success) {
            // console.log(fetchChannelResult.data.data);
            setChannel(fetchChannelResult.data.data);
            const fetchVideoData = await videoService.fetchVideoList(token, {
                page: 1,
                pageSize: videoPerRequest
            })
            if (fetchVideoData.success) {
                setVideoList(fetchVideoData.data.data)
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
                     src={IMAGES.icon.avatar}/>
                <div className='flex flex-col'>
                    <h3 className='text-md md:text-xl font-medium tracking-wide'>{channel?.name}</h3>
                    <div className='flex flex-col'>
                    <span
                        className='text-[12px] md:text-[14px] tracking-wide font-[500] text-[#323232]'>@ {channel?.shortname || 'No shortname'}</span>
                        <span
                            className='text-[12px] md:text-[13px] tracking-wider -mt-1 font-[500] text-[#323232]'>{StringUtils.formatNumber(channel?.subscriberCount)} subscribers</span>
                    </div>
                </div>
            </div>
            <div>
                <h4 className='text-[16px] text-[#585858] font-bold tracking-wider'>VIDEOS</h4>
                <div className='mt-3 gap-x-5 gap-y-3 grid sm:grid-cols-1 md:grid-cols-6 px-4'>
                    {
                        videoList.map((item) => (
                            <VideoMini data={item} key={item.id}/>
                        ))
                    }
                </div>
            </div>
            <div>

            </div>
        </div>
    )


}