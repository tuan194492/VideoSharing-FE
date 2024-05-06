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
    console.log(props);
    console.log(videoId);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

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
            pageSize: commentPerRequest
        })
        console.log(result);
        if (result.success) {
            setCommentList(result.data.data)
            if (result.data.count < commentPerRequest) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            console.log(result.data.data)
        }
    }

    useEffect( () => {
        initCommentData();
    }, []);

    const fetchMoreData = async () => {
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
        <InfiniteScroll
            dataLength={commentList.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<ThreeCircles />}
            className={'flex flex-col'}
        >
            {commentList.length > 0 && commentList.map(item => {
                return <CommentBox comment={item}/>
            })}
        </InfiniteScroll>
    )
}