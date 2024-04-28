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

}

const undoLikeVideo = async (token, videoId) => {

}

const dislikeVideo = async (token, videoId) => {

}

const undoDislikeVideo = async (token, videoId) => {

}

export const reactionService = {
    likeComment,
    undoLikeComment,
    dislikeComment,
    undoDislikeComment,
    likeVideo,
    undoLikeVideo,
    dislikeVideo,
    undoDislikeVideo
}