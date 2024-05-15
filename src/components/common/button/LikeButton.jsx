import {useContext, useEffect, useState} from "react";
import {StringUtils} from "../../../utils/string/StringUtils";
import {AuthContext} from "../../../context/AuthContext";
import {reactionService} from "../../../api/user/reaction";
import {ReactionType} from "../../../utils/enum/ReactionType";
import {toast} from "react-toastify";
import {AiOutlineLike} from "react-icons/ai";

export const LikeButton = (props) => {
    console.log(props)
    const videoId = props.videoId;
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [likeCount, setLikeCount] = useState(props.count);
    const [liked, setLiked] = useState(props.liked);
    const handleClick = async () => {
        if (liked) {
            const result = await reactionService.undoLikeVideo(token, props.videoId);
            if (result.success) {
                toast.success(result.message);
                setLikeCount(prev => prev - 1);
                return setLiked(false);
            } else {
                return toast.error(result.message);
            }
        }

        const result = await reactionService.likeVideo(token, props.videoId);
        if (result.success) {
            toast.success(result.message);
            setLikeCount(prev => prev + 1);
            return setLiked(true);
        } else {
            return toast.error(result.message);
        }
    }

    const initData = async () => {
        setLikeCount(props.count)
        if (token == null) {
            return setLiked(false);
        }
        const fetchReactionStatus = await reactionService.isUserReactToVideo(token, props.videoId);
        console.log(fetchReactionStatus);
        if (fetchReactionStatus.success) {
            return setLiked(fetchReactionStatus.isLiked);
        }
        setLiked(false);

    }

    useEffect(() => {
        initData();
    }, [props.videoId, props.count]);

    function getClassNameForButton() {
        if (liked) {
            return ' bg-red-500 text-white hover:bg-red-600';
        }
    }

    return (
        <div
            className={'inline-flex bg-gray-100 rounded-l-full px-4 hover:bg-gray-200 hover:cursor-pointer ' + props.className + ' ' + getClassNameForButton()}
            onClick={handleClick}
        >
            <AiOutlineLike size={28}/>
            <span className={'like-count p-1'}>
                {StringUtils.formatNumber(likeCount)}
            </span>
        </div>


    )
}