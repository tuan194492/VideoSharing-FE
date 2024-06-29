import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {videoService} from "../../../../api/user/video";
import {ImageUtils} from "../../../../utils/images/ImageUtils";
import {StringUtils} from "../../../../utils/string/StringUtils";
import {DateUtils} from "../../../../utils/date/DateUtils";
import {VideoSearchFeed} from "../../../../components/common/video/VideoSearchFeed";
import {Error404Page} from "../../../common/Error404Page";
import {NoContentPage} from "../../../common/NoContentPage";
import {channelService} from "../../../../api/user/channel";
import {ChannelCardWithoutSubscribe} from "../../../../components/common/channel/ChannelCardWithoutSubscribe";
import {Pagination} from "flowbite-react";

export const VideoSearchPage = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const navigate = useNavigate();
    console.log(params, params.get('searchType'), params.get('param'))
    const [videoList, setVideoList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [channelList, setChannelList] = useState([]);


    const fetchData = async () => {
        setLoading(true);
        const result = await videoService.searchVideo(params.get('param'));
        setLoading(false);
        if (result.success) {
            setVideoList([...videoList, ...result.data.data.rows]);
        } else {
            setVideoList([...videoList]);
        }
    }



    const initData = async () => {
        if (params.get('searchType') === 'Video') {
            setLoading(true);
            const result = await videoService.searchVideo(params.get('param'));
            setLoading(false);
            if (result.success) {
                setVideoList([...result.data.data.rows]);
            } else {
                setVideoList([]);
            }
        } else {
            setLoading(true);
            const result = await channelService.searchChannel(params.get('param'));
            console.log(result)
            setLoading(false);
            if (result.success) {
                setChannelList([...result.data.data]);
            } else {
                setChannelList([]);
            }
        }

    }

    useEffect(() => {
        initData();
    }, [params.get('param'), params.get('searchType')]);

    return (
        <div>
            {
                params.get('searchType') === 'Video' &&
                <div className={`pl-0 w-100% flex flex-col gap-y-5`}>
                    {!loading && (videoList && videoList.length > 0 ?
                            videoList.map((e, index) => {
                                return (
                                    <VideoSearchFeed video={e} index={index}/>
                                )
                            })
                            :
                            <div className={'translate-y-[-100px]'}>
                                <NoContentPage/>
                            </div>
                    )

                    }
                    {
                        loading &&
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                            <div
                                className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-white"></div>
                            <span className="text-white ml-4">Loading Videos...</span>
                        </div>
                    }
                </div>
            }

            {
                params.get('searchType') === 'Channel' &&
                <div className={'pr-12 '}>

                    {
                        !loading && (channelList && (channelList.length > 0 ?
                            <div className={'grid grid-cols-4 gap-6'}>
                                {channelList.map(subscription => {
                                    return <ChannelCardWithoutSubscribe data={
                                        {user: subscription}
                                    } key={subscription.id}/>
                                })}
                            </div>
                            :
                            <div className={'translate-y-[-100px]'}>
                                <NoContentPage/>
                            </div>))
                    }

                    {
                        loading &&
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                            <div
                                className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-white"></div>
                            <span className="text-white ml-4">Loading Channels...</span>
                        </div>
                    }
                </div>
            }
        </div>)
}
