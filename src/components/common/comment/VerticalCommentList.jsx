import {ThreeCircles} from "react-loader-spinner";
import VideoVerticalList from "../../user/video/VideoVerticalList";
import InfiniteScroll from "react-infinite-scroll-component";
import {useEffect, useState} from "react";
import {CommentBox} from "./CommentBox";
import {videoService} from "../../../api/user/video";
import {commentService} from "../../../api/user/comment";

export const VerticalCommentList = (props) => {
    const [commentList, setCommentList] = useState([]);
    const videoId = props.videoId || 1;
    // console.log(props);
    // console.log(videoId);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [refreshComment, setRefreshComment] = useState(false);

    const fetchCommentList = async (page, pageSize) => {
        const result = await commentService.getCommentListByVideo(videoId, {
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

    const commentPerRequest = 10;

    const initCommentData = async () => {
        console.log('Init comment data')
        const result = await commentService.getCommentListByVideo(props.videoId, {
            page: 1,
            pageSize: commentList.length > 0 ? commentList.length + 1 : commentPerRequest
        })
        console.log(result);
        if (result.success) {
            setCommentList(result.data.data)
            if (result.data.rows < commentPerRequest) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            console.log('Has more is ' + hasMore)
            console.log(result.data.data)
        }
    }

    useEffect( () => {
        initCommentData();
    }, [videoId, props.refreshComments, refreshComment]);

    const fetchMoreData = async (e) => {
        console.log('Has more')
        const result = await fetchCommentList(currentPage + 1, commentPerRequest);
        if (result.length > 0) {
            setCommentList([...commentList, ...result]);
            setCurrentPage(currentPage => currentPage + 1);
            setHasMore(result.length === commentPerRequest);
        } else {
            setHasMore(false);
        }
        console.log(hasMore)
    }

    return (
        <div id={'scrollableDiv'}>
            <InfiniteScroll
                dataLength={commentList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<ThreeCircles />}
                data={commentList}
                className={'flex flex-col'}
                onScroll={e => console.log('Scrolling')}
                scrollableTarget="scrollableDiv"
            >
                {commentList.length > 0 && commentList.map((item, index) => {
                    return <CommentBox key={index}
                                       comment={item}
                                       handleRefreshComment={() => {
                                           setRefreshComment(prev => !prev)}
                                       }
                                       onDeleteComment={() => {
                                           props.onCommentDeleted();
                                       }}
                    />
                })}
            </InfiniteScroll>
            <div className={'flex justify-center mt-8'}>
                <button
                    className={'bg-black rounded-full px-4 ml-2 text-white hover:bg-white hover:text-black hover:border border-black'}
                    onClick={fetchMoreData}>
                    Show more
                </button>
            </div>
        </div>

    )
}