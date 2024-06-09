import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {toast} from "react-toastify";
import {errorMessages} from "../../../assets/message/error_messages/error-messages";
import {commentService} from "../../../api/user/comment";
import {successMessage} from "../../../assets/message/success_message/success_message";

export const CommentPostBox = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;

    let [commentValue, setCommentValue] = useState('');
    const hideReply = props.hideReply;
    function onCancelHandle(e) {
        console.log(commentValue)
        console.log('Delete comment  value')
        const empty = '';
        setCommentValue(empty)
        console.log(commentValue)
        hideReply && props.hideReply();
    }

    async function onHandleSubmit() {
        if (!token) {
            return toast.error(errorMessages.NEED_TO_LOGIN_TO_POST_COMMENT);
        }
        const data = {
            comment: commentValue
        }
        const postCommentResult = await commentService.postComment(token, data, props.videoId);
        if (!postCommentResult.success) {
            return toast.error(postCommentResult.message);
        }
        toast.success(successMessage.POST_COMMENT_SUCCESSFUL);
        props.onCommentPosted && props.onCommentPosted();
        setCommentValue('');

    }

    return (
        <div className="bg-white rounded-lg border p-2 mx-auto">
            <div className="px-3 mb-2 mt-2">
                <textarea
                    onChange={e => {
                        const newCommentValue = e.target.value;
                        setCommentValue(newCommentValue);

                    }}
                    value={commentValue}
                    autoFocus={props.autoFocus}
                    placeholder={props.holder || "Post your comment here ..."}
                    className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus:bg-white">

                </textarea>
            </div>
            <div className="flex justify-end px-4 gap-4">
                <button
                    className="px-2.5 py-1.5 rounded-md text-white text-md bg-gray-400 hover:bg-gray-500 transition-colors"
                    onClick={onCancelHandle}
                >
                    Cancel
                </button>
                <button
                    className="px-2.5 py-1.5 rounded-md  text-white text-md bg-blue-600 hover:bg-blue-800"
                    onClick={onHandleSubmit}
                >
                    Post
                </button>
            </div>
        </div>
    )
}