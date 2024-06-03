import {useContext, useEffect, useState} from "react";
import {channelService} from "../../api/user/channel";
import {AuthContext} from "../../context/AuthContext";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {VideoSearchFeed} from "../common/video/VideoSearchFeed";
import {RotatingLines, ThreeDots} from "react-loader-spinner";
import {StringUtils} from "../../utils/string/StringUtils";

export const TopWatchedVideo = (props) => {
    const authContext = useContext(AuthContext);
    const channel = authContext.user;
    const [mostWatchedVideo, setMostWatchedVideo] = useState([])
    const [videoCount, setVideoCount] = useState(5);
    const [dayAgo, setDayAgo] = useState(14);
    const [loading, setLoading] = useState(false);
    const fetchMostWatchedVideo = async () => {
        setLoading(true);
        const result = await channelService.getMostWatchedVideos(channel.id);
        if (result.success) {
            setMostWatchedVideo(result.data.data);
        } else {
            console.log(result.message);
        }
        setLoading(false);
    }
    const refreshMostWatchedVideo = async () => {
        setLoading(true);
        const result = await channelService.getMostWatchedVideos(channel.id);
        if (result.success) {
            setMostWatchedVideo(result.data.data);
        } else {
            console.log(result.message);
        }
        setLoading(false);
    }

    const handleChangeNumberOfVideo = async (event) => {
        setVideoCount(event.target.value);
        await refreshMostWatchedVideo();

    }

    const initData = async () => {
        await fetchMostWatchedVideo();
    }

    useEffect(() => {
        initData();
    }, [])

    return (
        <div className={'w-full min-h-[500px] border-2 border-gray-200 rounded-xl'}>
            <div className={'text-white font-semibold bg-gray-700 p-3 pl-6 rounded-t-xl flex flex-row items-center'}>
                <div className={'flex-grow'}>
                    Top {videoCount} watched videos last 14 days
                </div>
                <div className={''}>
                    <input type="text" id="number-input" aria-describedby="helper-text-explanation"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70px] p-2.5"
                           defaultValue={videoCount} onBlur={handleChangeNumberOfVideo}/>
                </div>
            </div>
            {
                loading && <div className={'flex justify-center mt-24'}>
                    <RotatingLines width={80}/>
                </div>
            }
            {
                !loading && <div className={'mt-2 p-3 pb-20'}>
                    {
                        mostWatchedVideo.length > 0 ?
                            mostWatchedVideo.map((video, index) => <div key={video.id} className={'flex justify-center'}>
                                <span className={'text-gray-500 text-sm flex justify-items-center justify-center flex-col'}>{index + 1}</span>
                                <VideoSearchFeed video={video} className={'ml-2'}/>
                                <span className={'text-gray-500 text-sm flex justify-items-center justify-start flex-col mt-2'}>{StringUtils.formatNumber(video.viewCount)} views</span>
                            </div>)
                            :
                            <div className={'text-gray-500 text-center text-md'}>
                                No video found. Maybe you should upload some :)
                            </div>
                    }
                </div>
            }

        </div>
    )
}