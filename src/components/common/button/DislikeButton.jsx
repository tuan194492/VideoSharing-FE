import {useContext, useEffect, useState} from "react";
import {StringUtils} from "../../../utils/string/StringUtils";
import {reactionService} from "../../../api/user/reaction";
import {AuthContext} from "../../../context/AuthContext";
import {toast} from "react-toastify";

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
            className={'inline-flex rounded-full bg-gray-300 p-2 text-xs hover:cursor-pointer ' + props.className + ' ' + getClassNameForButton()}
            onClick={handleClick}
        >
            <button 
                className={'w-[25px] rotate-180 translate-y-1'}>
                <svg version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" className="css-ywt53g">
                    <path transform="scale(-1, 1) translate(-1200, 0)"
                          d="m1100 333.33c36.668 0 66.668 30 66.668 66.668v733.33c0 36.668-30 66.668-66.668 66.668h-133.33c-36.668 0-66.668-30-66.668-66.668v-733.33c0-36.668 30-66.668 66.668-66.668zm-604.64-300.63 281.27 377.4c7.332 10.734 11.664 23.734 11.664 37.734v666.66c0 36.801-29.867 66.668-66.664 66.668h-466.67c-29.465 0-55.398-19.332-63.867-47.535l-152.2-581.33c-25.266-85.465 38.734-171.13 127.87-171.13h221.53l-65.598-266.67c-13.867-97.266 106.2-154.2 172.66-81.801z"
                          fill-rule="evenodd"></path>
                </svg>
            </button>
            <span className={'like-count p-1'}>
                {StringUtils.formatNumber(dislikeCount)}
            </span>
        </div>


    )
}