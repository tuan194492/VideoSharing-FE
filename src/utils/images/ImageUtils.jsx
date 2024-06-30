import {StringUtils} from "../string/StringUtils";
import {IMAGES} from "./images";

const createImageSrcFromBuffer = (buffer) => {
    if (!buffer) {
        return IMAGES.icon.noImage;
    }
    const base64String = StringUtils.getBase64String(buffer);
    console.log(`data:image/png;base64,${base64String}`)
    return `data:image/png;base64,${base64String}`;
}

const createImageSrcFromBufferWithDefaultIsAvatar = (buffer) => {
    if (!buffer) {
        return IMAGES.icon.avatar;
    }
    const base64String = StringUtils.getBase64String(buffer);
    return `data:image/png;base64,${base64String}`;
}

export const ImageUtils = {
    createImageSrcFromBuffer,
    createImageSrcFromBufferWithDefaultIsAvatar
}