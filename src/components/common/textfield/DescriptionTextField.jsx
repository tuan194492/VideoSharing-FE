import {videoService} from "../../../api/user/video";
import {useState} from "react";
import {StringUtils} from "../../../utils/string/StringUtils";

export const DescriptionTextField = (props) => {
    const {videoId, userId} = props;

    const [videoData, setVideoData] = useState(videoService.fetchVideoDescriptionData(videoId));
    const [isShowingMoreDetail, setShowingMoreDetail] = useState(StringUtils.countLines(videoData.description) > 5);

    return (
        <div className={'border border-gray-100 p-3'}>
            <div className={'text font-bold'}>
                {videoData.viewCount} views - {videoData.dateTime}
            </div>
            <div className={'text font-medium'}>
                {videoData.title}
            </div>
            <p>
                {videoData.description}
            </p>
            <button hidden={!isShowingMoreDetail}>
                Show more
            </button>

        </div>
    )
}