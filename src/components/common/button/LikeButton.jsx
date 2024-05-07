import {useContext, useEffect, useState} from "react";
import {StringUtils} from "../../../utils/string/StringUtils";
import {AuthContext} from "../../../context/AuthContext";
import {reactionService} from "../../../api/user/reaction";
import {ReactionType} from "../../../utils/enum/ReactionType";
import {toast} from "react-toastify";

export const LikeButton = (props) => {
    console.log(props)
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
    }, []);

    function getClassNameForButton() {
        if (liked) {
            return ' bg-red-500 text-white hover:bg-red-600';
        }
    }

    return (
        <div
            className={'inline-flex rounded-full bg-gray-300 p-2 text-xs hover:cursor-pointer ' + props.className + ' ' + getClassNameForButton()}
            onClick={handleClick}
        >
            <button className={'w-[25px]'}>
                <svg version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" className="css-ywt53g">
                    <path transform="scale(-1, 1) translate(-1200, 0)"
                          d="m1100 333.33c36.668 0 66.668 30 66.668 66.668v733.33c0 36.668-30 66.668-66.668 66.668h-133.33c-36.668 0-66.668-30-66.668-66.668v-733.33c0-36.668 30-66.668 66.668-66.668zm-604.64-300.63 281.27 377.4c7.332 10.734 11.664 23.734 11.664 37.734v666.66c0 36.801-29.867 66.668-66.664 66.668h-466.67c-29.465 0-55.398-19.332-63.867-47.535l-152.2-581.33c-25.266-85.465 38.734-171.13 127.87-171.13h221.53l-65.598-266.67c-13.867-97.266 106.2-154.2 172.66-81.801z"
                          fill-rule="evenodd"></path>
                </svg>
            </button>
            <span className={'like-count p-1'}>
                {StringUtils.formatNumber(likeCount)}
            </span>
        </div>


    )
}