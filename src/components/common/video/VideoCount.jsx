import React from "react";
import {StringUtils} from "../../../utils/string/StringUtils";

const VideoCount = ({ count }) => {
    if (!count) {
        count = 0;
    }

    return (
        <div className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
            {StringUtils.formatNumber(count)} videos
        </div>
    );
};

export default VideoCount;
