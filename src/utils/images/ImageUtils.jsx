import {StringUtils} from "../string/StringUtils";
import {IMAGES} from "./images";

const createImageSrcFromBuffer = (buffer) => {
    if (!buffer || !(buffer instanceof Blob)) {
        return IMAGES.icon.noImage;
    }
    const base64String = StringUtils.getBase64String(buffer);
    return `data:image/png;base64,${base64String}`;
}

export const ImageUtils = {
    createImageSrcFromBuffer
}