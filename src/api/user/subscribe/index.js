import axios from "axios";
import {RequestFactory} from "../../../utils/request";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

const subscribeChannel = async (token, channelId) => {

}

const undoSubscribeChannel = async (token, channelId) => {

}

const isSubscribed = async (channelId, id) => {

}

export const subscribeService = {
    subscribeChannel,
    undoSubscribeChannel,
    isSubscribed
}