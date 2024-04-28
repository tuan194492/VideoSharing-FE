import axios from "axios";
import {RequestFactory} from "../../../utils/request";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

const getCommentListByVideo = async (id, query) => {
    try {
        const {
            page, pageSize
        } = query;
        const result = await axios.get(`${baseAdminURL}/comment/${id}?page=${page || 0}&pageSize=${pageSize || 8}`);
        console.log(result)
        return {
            success: true,
            data: result.data.data,
            message: 'Get comment list successfully!'
        };
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: error.response.data.error
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

const postComment = async (token, data, videoId) => {
    try {
        const formData = RequestFactory.createFormDataFromObject(data);

        const result = await axios.post(`${baseAdminURL}/comment/${videoId}`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Post comment successful!'
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

const deleteComment = async (token, commentId) => {
    try {
        const result = await axios.delete(`${baseAdminURL}/comment/${commentId}`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Delete comment successful!'
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

export const commentService = {
    getCommentListByVideo,
    postComment,
    deleteComment
}