import userService, {userService as videoService} from '../../../api/user/video/index'
import {IMAGES} from "../../../utils/images/images";

export const VideoMini = (props) => {
    const {id} = props;
    const fetchPageData = async (videoId) => {
        const data = await videoService.findVideoById();
        return data;
    }
    return (
        <div className={"grid grid-cols-5"}>
            <div className={"thumbnail col col-span-2"}>
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Ffree%2520download%2F&psig=AOvVaw2OslbecdKIOYUVwZExzAY_&ust=1712135465699000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMD13-eXo4UDFQAAAAAdAAAAABAI" alt={"An alt"}/>
            </div>
            <div className={"col col-span-3"}>
                <div className={"title"}>

                </div>
                <div className={"channel-name"}>

                </div>
                <div className={"detail"}>
                    <span className={"view-count"}>

                    </span>
                    <span className={"posted-date"}>

                    </span>
                </div>
            </div>
        </div>
    )
}