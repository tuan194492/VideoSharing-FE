import {StringUtils} from "../string/StringUtils";

const createImageSrcFromBuffer = (buffer) => {
    const base64String = StringUtils.getBase64String(buffer);
    return `data:image/png;base64,${base64String}`;
}

export const ImageUtils = {
    createImageSrcFromBuffer
}