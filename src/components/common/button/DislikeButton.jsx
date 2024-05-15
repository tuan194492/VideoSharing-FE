import {useContext, useEffect, useState} from "react";
import {StringUtils} from "../../../utils/string/StringUtils";
import {reactionService} from "../../../api/user/reaction";
import {AuthContext} from "../../../context/AuthContext";
import {toast} from "react-toastify";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";

export const DislikeButton = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [dislikeCount, setDislikeCount] = useState(props.count);
    const [disliked, setDisliked] = useState(props.disliked);
    const handleClick = async () => {
        if (disliked) {
            const result = await reactionService.undoDislikeVideo(token, props.videoId);
            if (result.success) {
                toast.success(result.message);
                setDislikeCount(dislikeCount => dislikeCount - 1);
                return setDisliked(false);
            } else {
                return toast.error(result.message);
            }
        }

        const result = await reactionService.dislikeVideo(token, props.videoId);
        if (result.success) {
            toast.success(result.message);
            setDislikeCount(dislikeCount => dislikeCount + 1);
            return setDisliked(true);
        } else {
            return toast.error(result.message);
        }
    }

    const initData = async () => {
        setDislikeCount(props.count);
        if (token == null) {
            return setDisliked(false);
        }
        const fetchReactionStatus = await reactionService.isUserReactToVideo(token, props.videoId);
        if (fetchReactionStatus.success) {
            return setDisliked(fetchReactionStatus.isDisliked);
        }
        setDisliked(false);

    }

    useEffect(() => {
        initData();
    }, [props.videoId, props.count]);

    function getClassNameForButton() {
        if (disliked) {
            return ' bg-red-500 text-white hover:bg-red-600';
        }
    }

    return (
        <div
            className={'inline-flex bg-gray-100 rounded-r-full px-4 border-l-2 border-gray-300 hover:bg-gray-200 hover:cursor-pointer ' + props.className + ' ' + getClassNameForButton()}
            onClick={handleClick}
        >
            <button>
                <AiOutlineDislike size={28}/>
            </button>
            <span className={'like-count p-1'}>
                {StringUtils.formatNumber(dislikeCount)}
            </span>
        </div>


    )
}