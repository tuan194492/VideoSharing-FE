import {StringUtils} from "../string/StringUtils";

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function getPostedSince(createTime) {
    return StringUtils.convertSeconds(((new Date()).getTime() - new Date(createTime).getTime()) / 1000);
}

export const DateUtils = {
    formatDate,
    getPostedSince
}