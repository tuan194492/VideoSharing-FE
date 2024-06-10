import {IMAGES} from "../../../utils/images/images";
import {StringUtils} from "../../../utils/string/StringUtils";
import './index.css';
import '../../../css/index.css'
import {LikeButton} from "../button/LikeButton";
import {DislikeButton} from "../button/DislikeButton";
import {useContext, useState} from "react";
import {MyButton} from "../button/MyButton";
import {CommentPostBox} from "./CommentPostBox";
import {DescriptionTextField} from "../textfield/DescriptionTextField";
import {DropdownButton} from "../button/DropDownButton";
import {ThreeDotDropDownButton} from "../button/ThreeDotDropDownButton";
import {commentService} from "../../../api/user/comment";
import {toast} from "react-toastify";
import {AuthContext} from "../../../context/AuthContext";
import {ReportPopup} from "../report/ReportPopup";
import {ReportType} from "../../../utils/enum/ReportType";
import Popup from "reactjs-popup";

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
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [showReply, setShowReply] = useState(false);
    const hideReply = () => {
        setShowReply(false);
    }

    const handleDeleteComment = async () =>  {
        const result = await commentService.deleteComment(token, commentId);
        console.log(result)
        if (result.success) {
            toast.success('Delete comment successful');
            props.onDeleteComment();
           return props.handleRefreshComment();
        }
        toast.error(result.message);
    }
    const [open, setOpen] = useState(false);

    function handleReportComment() {
        setOpen(prev => !prev);
    }

    const closeModal = () => setOpen(false);


    return (
        <div className={'grid grid-cols-12 p-2 mt-1.5'}>
            <div className={'relative h-14 md:h-12 md:rounded-xl overflow-hidden'}>
                <img src={IMAGES.icon.avatar} className={"h-full w-full object-contain rounded-lg"}/>
            </div>
            <div className={'col ml-4 md:ml-0 col-span-11 relative'}>
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
                <ThreeDotDropDownButton
                    className={'absolute top-0 right-0'}
                    options={[
                        {
                            value: 'delete',
                            label: 'Delete',
                            onSelect: handleDeleteComment
                        },
                        {
                            value: 'report',
                            label: 'Report',
                            onSelect: handleReportComment
                        }
                ]}/>
                <Popup nested contentStyle={{width: '25%'}} open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className={'modal'}>
                        <ReportPopup
                            onSuccess={() => closeModal()}
                            comment_id={commentId}
                            type={ReportType.Comment}
                        />
                    </div>
                </Popup>
            </div>
        </div>
    )
}