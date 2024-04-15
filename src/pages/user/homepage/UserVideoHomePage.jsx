import {VideoMini} from "../../../components/common/homepage/VideoMini";
import {useContext, useEffect, useState} from "react";
import {videoService} from "../../../api/user/video";
import {AuthContext} from "../../../context/AuthContext";
import async from "async";
import InfiniteScroll from "react-infinite-scroll-component";
import {ThreeCircles, ThreeDots} from "react-loader-spinner";

export const UserVideoHomePage = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [videoList, setVideoList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    function getClassNameForVideoMini() {
        return 'col col-span-1';
    }

    const videoPerRequest = 8;

    const fetchVideoData = async (page, pageSize) => {
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

    useEffect( () => {
        initVideoData();
    }, []);

    const fetchMoreData = async () => {
        console.log('Has more')
        const result = await fetchVideoData(currentPage + 1, videoPerRequest);
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
        <InfiniteScroll
            dataLength={videoList.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<ThreeCircles />}
            className={'flex justify-center'}
        >
            <div className={'grid sm:grid-cols-1 md:grid-cols-4 p-1 gap-1'}>
                {videoList &&
                    videoList.map(item => <VideoMini data={item} className={getClassNameForVideoMini}/>)}
            </div>
        </InfiniteScroll>

    )
}