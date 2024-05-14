import userService, {videoService as videoService} from '../../../api/user/video/index'
import {IMAGES} from "../../../utils/images/images";
import {useNavigate} from "react-router-dom";
import {StringUtils} from "../../../utils/string/StringUtils";

export const VideoMini = (props) => {
    const data = props.data;
    // console.log(data);
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
            <div className={"thumbnail col col-span-2 w-full p-2 flex justify-center aspect-ratio-container"}>
                <img src={`data:image/png;base64,${base64String}`}
                     alt={"An alt"}
                     className={"aspect-ratio-image rounded-lg"}/>
            </div>
            <div className={"col col-span-3 p-1 flex flex-col justify-between"}>
                <div className={"title font-bold text-sm line-clamp-2"}>
                    {data.title}
                </div>
                <div className={"channel-name text-gray-700 text-sm mb-3"}>
                    <div >
                        {data.user_name}
                    </div>
                    <div className={"detail"}>
                        <span className={"view-count"}>
                            {StringUtils.formatNumber(data.views)} views
                        </span>
                        <span className={"posted-date ml-4"}>
                            {StringUtils.convertSeconds(data.postedSince)} ago
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}