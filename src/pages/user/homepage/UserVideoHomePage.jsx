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
    const [loading, setLoading] = useState(false);
    function getClassNameForVideoMini() {
        return 'col col-span-1';
    }

    const videoPerRequest = 8;

    const fetchVideoData = async (page, pageSize) => {
        const result = await videoService.fetchVideoList(token, {
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
        setLoading(true);
        const result = await videoService.fetchVideoList(token, {
            page: 1,
            pageSize: videoPerRequest
        })
        setLoading(false);
        if (result.success) {
            setVideoList(result.data.data)
            if (result.data.count < videoPerRequest) {
                setHasMore(false);
            } else {
                const resultMore = await videoService.fetchVideoList(token, {
                    page: 2,
                    pageSize: videoPerRequest
                })
                setHasMore(resultMore.success && resultMore.data.count === 0);
            }
        }
    }

    useEffect( () => {
        initVideoData();
    }, []);

    const fetchMoreData = async () => {
        setLoading(true);
        console.log('Has more')
        const result = await fetchVideoData(currentPage + 1, videoPerRequest);
        setLoading(true);
        if (result.length > 0) {
            setVideoList([...videoList, ...result]);
            setCurrentPage(currentPage => currentPage + 1);
            setHasMore(result.length === videoPerRequest);
        } else {
            setHasMore(false);
        }
        console.log(hasMore)

    }



    return (
        <div
            className={'flex justify-center flex-col relative'}
        >
            <InfiniteScroll
                dataLength={videoList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={loading && <div className={'fixed ml-auto mr-auto'}><ThreeDots/></div>}
                scrollThreshold="0.8"
                scrollableTarget={"videoList"}
            >
                <div
                    id="videoList"
                    className={'grid sm:grid-cols-1 md:grid-cols-4 p-1 gap-1'}>
                    {videoList &&
                        videoList.map(item => <VideoMini data={item} className={getClassNameForVideoMini}/>)}
                </div>
            </InfiniteScroll>
            {/*<button onClick={fetchMoreData}>*/}
            {/*    Show more*/}
            {/*</button>*/}
            <div className={'flex justify-center mt-8'}>
                <button
                    onClick={fetchMoreData}
                    className={'w-[150px] py-1 bg-black rounded-full px-4 ml-2 text-white hover:bg-white hover:text-black hover:border border-black '}>
                    Show more
                </button>
            </div>

        </div>


    )
}