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
            <div className={'avatar-box col col-span-1'}>
                <img src={IMAGES.icon.avatar} className={"rounded-2xl w-[100%] p-2"}/>
            </div>
            <div className={'col col-span-11 ml-1'}>
                <div>
                    <span className={"channel-name text-lg font-bold"}>
                        {props.comment.username}
                    </span>
                    <span className={'ml-2'}>
                        {StringUtils.convertSeconds(currentComment.postedSince)} ago
                    </span>
                </div>
                <DescriptionTextField description={currentComment.value} line={2} />
                <div className={'flex gap-0.5'}>
                    <LikeButton
                        className={'scale-75'}
                        count={currentComment.likeCount}
                        liked={currentComment.liked}/>
                    <DislikeButton
                        className={'scale-75'}
                        count={currentComment.dislikeCount}
                        disliked={currentComment.disliked}/>
                    <button className={'text-2xl default-button scale-75'} onClick={e => {
                            setShowReply(showReply => !showReply)}
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