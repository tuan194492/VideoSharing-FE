import {IMAGES} from "../../../utils/images/images";
import {StringUtils} from "../../../utils/string/StringUtils";
import './index.css';
import '../../../css/index.css'
import {LikeButton} from "../button/LikeButton";
import {DislikeButton} from "../button/DislikeButton";
import {useState} from "react";
import {MyButton} from "../button/MyButton";
import {CommentPostBox} from "./CommentPostBox";
import {DescriptionTextField} from "../textfield/DescriptionTextField";

export const CommentBox = (props) => {
    // console.log(props.comment);
    const commentId = props.comment.id;
    const [currentComment, setCurrentComment] = useState({
        dislikeCount: 0,
        likeCount: 0,
        value: props.comment.value,
        liked: false,
        disliked: false,
        postedSince: props.comment.postedSince
    });
    const [showReply, setShowReply] = useState(false);
    const hideReply = () => {
        setShowReply(false);
    }
    return (
        <div className={'grid grid-cols-12 p-2 mt-1.5'}>
            <div className={'relative h-14 md:h-12 md:rounded-xl overflow-hidden'}>
                <img src={IMAGES.icon.avatar} className={"h-full w-full object-contain rounded-lg"}/>
            </div>
            <div className={'col col-span-11'}>
                <div>
                    <span className={"text-black text-md font-semibold "}>
                        {props.comment.username}
                    </span>
                    <span className={'ml-2 text-black/[0.7] text-sm'}>
                        {StringUtils.convertSeconds(currentComment.postedSince)} ago
                    </span>
                </div>
                <DescriptionTextField description={currentComment.value} line={2}/>
                <div className={'flex mt-2'}>
                    <div className={'flex flex-row scale-75'}>
                        <LikeButton
                            count={currentComment.likeCount}
                            liked={currentComment.liked}/>
                        <DislikeButton
                            count={currentComment.dislikeCount}
                            disliked={currentComment.disliked}/>
                    </div>

                    <button
                        className={'flex rounded-full bg-gray-100 hover:bg-gray-200 p-2 text-xs whitespace-nowrap hover:cursor-pointer'}
                        onClick={e => {
                            setShowReply(showReply => !showReply)
                        }
                        }>
                        Reply
                    </button>
                </div>
                {
                    showReply &&
                    <div>
                        <CommentPostBox hideReply={hideReply} autoFocus holder={'Reply...'}/>
                    </div>
                }
            </div>
        </div>
    )
}