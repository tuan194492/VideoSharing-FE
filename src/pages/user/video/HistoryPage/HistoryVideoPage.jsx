import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../../context/AuthContext";
import {videoService} from "../../../../api/user/video";
import {ChannelCard} from "../../../../components/common/channel/ChannelCard";
import {Pagination} from "flowbite-react";
import SearchBar from "../../../../components/common/search/SearchBar";
import {VideoSearchFeed} from "../../../../components/common/video/VideoSearchFeed";
import {BiTrash} from "react-icons/bi";
import {toast} from "react-toastify";
import {NoContentPage} from "../../../common/NoContentPage";

const groupByCreatedDate = (videos) => {
    console.log(videos)
    if (!videos || !(videos instanceof Array)) return [];
    return videos.reduce((acc, video) => {
        const dateKey = new Date(video.createdAt).toISOString().split('T')[0];
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(video);
        return acc;
    }, {});
};

export const HistoryVideoPage = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext?.token;

    const [watchedVideoList, setWatchedVideoList] = useState([]);
    const [filteredVideoList, setFilteredVideoList] = useState([]);
    const [dateList, setDateList] = useState([]);

    const fetchData = async () => {
        const result = await videoService.getWatchedVideoList(token);
        if (result.success) {
            console.log(result.data.data)
            setWatchedVideoList(result.data.data);
            setFilteredVideoList(result.data.data);
            setDateList(groupByCreatedDate(result.data.data));
        }
    }

    const initData = async () => {
        await fetchData();
    }

    useEffect(() => {
        initData();
    }, []);

    const filter = (keyword) => {
        console.log('Filter')
        console.log(keyword);
        if (!keyword)
        {
            setFilteredVideoList(watchedVideoList);
            setDateList(groupByCreatedDate(watchedVideoList));
            return;
        }
        setFilteredVideoList(watchedVideoList.filter(video => video.Video.title.toLowerCase().includes(keyword.toLowerCase()) || video.Video?.description.toLowerCase().includes(keyword.toLowerCase())));
        setDateList(groupByCreatedDate(filteredVideoList));
    }

    const handleDeleteWatchHistory = async (e) => {
        const result = await videoService.deleteWatchedVideo(token);
        if (result.success) {
            toast.success('Delete watched videos successfully')
            return setDateList(null);
        } else {
            return toast.error(result.message);
        }
    }


    return (
        <div>
            <div>
                <div className={'font-extrabold text-4xl ml-3 '}>
                    Watch history
                </div>
                <div className={'grid grid-cols-5 mt-12 '}>
                    <div className={'col-span-4 px-4'}>
                        {
                            dateList && Object.keys(dateList).map(date => {
                                return <div className={'pr-12 mb-12'}>
                                    <div className={'font-extrabold text-xl ml-3 '}>
                                        {date}
                                    </div>
                                    <div className={'flex flex-col gap-4 mt-6'}>
                                        {
                                            dateList[date].map(video => {
                                                console.log(video)
                                                return <VideoSearchFeed video={video.Video} key={video.Video.id}/>;
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                        {
                            dateList.length === 0 && <div className={'translate-y-[-100px]'}>
                                <NoContentPage description={"Look like you haven't watched any video yet. :)"}/>
                            </div>
                        }
                    </div>

                    <div className={'col-span-1 px-4'}>
                        <SearchBar filter={filter}/>
                        <div>
                        <button
                                onClick={handleDeleteWatchHistory}
                                className={'flex flex-row gap-4 mt-6 justify-center text-center hover:bg-gray-200 p-4 rounded-xl'}>
                                <BiTrash size={20}/>
                                <div>
                                    Clear all watch history
                                </div>
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )


}