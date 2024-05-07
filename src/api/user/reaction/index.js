import axios from "axios";
import {RequestFactory} from "../../../utils/request";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

const likeComment = async (token, commentId) => {

}

const undoLikeComment = async (token, commentId) => {

}

const dislikeComment = async (token, commentId) => {

}

const undoDislikeComment = async (token, commentId) => {

}

const likeVideo = async (token, videoId) => {
    try {
        const formData = RequestFactory.createFormDataFromObject({});
        const result = await axios.post(`${baseAdminURL}/react/like-video/${videoId}`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Like video successful!'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}

const undoLikeVideo = async (token, videoId) => {
    try {
        const formData = RequestFactory.createFormDataFromObject({});
        console.log(token)
        const result = await axios.post(`${baseAdminURL}/react/undo-like-video/${videoId}`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Undo Like video successful!'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}

const dislikeVideo = async (token, videoId) => {
    try {
        const formData = RequestFactory.createFormDataFromObject({});
        const result = await axios.post(`${baseAdminURL}/react/dislike-video/${videoId}`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Dislike video successful!'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}

const undoDislikeVideo = async (token, videoId) => {
    try {
        const formData = RequestFactory.createFormDataFromObject({});
        const result = await axios.post(`${baseAdminURL}/react/undo-dislike-video/${videoId}`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Undo dislike video successful!'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}

const isUserReactToVideo = async (token, videoId) => {
    if (!token || !videoId) {
        return {
            success: false,
            isLiked: false,
            isDisliked: false
        };
    }
    try {
        const result = await axios.get(`${baseAdminURL}/react/react-to-video/${videoId}`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        console.log(result)
        return {
            success: true,
            isLiked: result.data.isLiked,
            isDisliked: result.data.isDisliked
        }
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                isLiked: false,
                isDisliked: false,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                isLiked: false,
                isDisliked: false
            };
        }
    }
}

export const reactionService = {
    likeComment,
    undoLikeComment,
    dislikeComment,
    undoDislikeComment,
    likeVideo,
    undoLikeVideo,
    dislikeVideo,
    undoDislikeVideo,
    isUserReactToVideo
}