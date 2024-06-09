import {IMAGES} from "../../../utils/images/images";
import {StringUtils} from "../../../utils/string/StringUtils";
import {useNavigate} from "react-router-dom";
import VideoLength from "../video/VideoLength";

export const VideoMini = (props) => {
    const data = props.data;
    // console.log(data)
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const page = role?.substring(1, role.length - 1).toLowerCase() || 'guest';

    const base64String = btoa(new Uint8Array(data.thumbnail.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    return (
        <div className={'p-1 cursor-pointer hover:bg-gray-100  ' + props.className} onClick={e => {
            navigate(`/${page}/video/detail/${data.id}`)
        }}>
            <div className="aspect-ratio-container relative">
                <img className={'aspect-ratio-image'} src={`data:image/png;base64,${base64String}`}/>
                <VideoLength time={data?.video_length_in_seconds} />
            </div>
            <div className={'grid grid-cols-12 mt-2'}>
                <div className={'col col-span-1 mt-2'}>
                <img src={IMAGES.icon.avatar} />
                </div>
                <div className={"col col-span-11 p-1 ml-3 flex flex-col justify-between"}>
                    <div className={"title font-bold text-lg line-clamp-2"}>
                        {data.title}
                    </div>
                    <div className={"channel-name text-black/[0.7] text-sm mt-1 "}>
                        <div className={'line-clamp-1 '}>
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
        </div>
    )
}