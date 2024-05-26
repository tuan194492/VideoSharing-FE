import userService, {videoService as videoService} from '../../../api/user/video/index'
import {IMAGES} from "../../../utils/images/images";
import {useNavigate} from "react-router-dom";
import {StringUtils} from "../../../utils/string/StringUtils";
import VideoLength from "./VideoLength";
import {DateUtils} from "../../../utils/date/DateUtils";


export const VideoMini = (props) => {
    const data = props.data;
    console.log(data);
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const page = role?.substring(1, role.length - 1).toLowerCase() || 'guest';

    const base64String = btoa(new Uint8Array(data.thumbnail.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    return (
        <div className={"grid grid-cols-5 cursor-pointer " + props.className}
             onClick={e => {
                 if (props.onClick) {
                     return props.onClick();
                 }
                 navigate(`/${page}/video/detail/${data.id}`);
             }}>
            <div className={"thumbnail col col-span-2 w-full flex justify-center aspect-ratio-container relative"}>
                <img src={`data:image/png;base64,${base64String}`}
                     alt={"An alt"}
                     className={"aspect-ratio-image rounded-lg"}/>
                <VideoLength time={data?.video_length_in_seconds} />
            </div>
            <div className={"col col-span-3 ml-4 flex flex-col justify-between"}>
                <div className={"title text-black text-md font-medium line-clamp-2"}>
                    {data.title}
                </div>
                <div className={"channel-name text-black/[0.7] text-sm"}>
                    <div >
                        {data.user_name}
                    </div>
                    <div className={"detail"}>
                        <span className={"view-count"}>
                            {StringUtils.formatNumber(data.views)} views
                        </span>
                        <span className={"posted-date ml-4"}>
                            {DateUtils.getPostedSince(data.createdAt)} ago
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}