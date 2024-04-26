import {IMAGES} from "../../../utils/images/images";
import {StringUtils} from "../../../utils/string/StringUtils";
import {useNavigate} from "react-router-dom";

export const VideoMini = (props) => {
    const data = props.data;
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const page = role?.substring(1, role.length - 1).toLowerCase() || 'guest';

    const base64String = btoa(new Uint8Array(data.thumbnail.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    return (
        <div className={'p-1 ' + props.className} onClick={e => {
            navigate(`/${page}/video/detail/${data.id}`)
        }}>
            <img className={'object-fill h-[25vh] w-[100%]'} src={`data:image/png;base64,${base64String}`} />
            <div className={'grid grid-cols-12'}>
                <div className={'col col-span-1 mt-2'}>
                    <img src={IMAGES.icon.avatar} />
                </div>
                <div className={"col col-span-11 p-1 ml-3 flex flex-col justify-between"}>
                    <div className={"title font-bold text-lg line-clamp-2"}>
                        {data.title}
                    </div>
                    <div className={"channel-name text-gray-700 text-sm mb-3 "}>
                        <div className={'line-clamp-1'}>
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