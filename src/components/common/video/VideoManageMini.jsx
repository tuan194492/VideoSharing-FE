import {useNavigate} from "react-router-dom";
import VideoLength from "./VideoLength";
import {StringUtils} from "../../../utils/string/StringUtils";
import {DescriptionTextField} from "../textfield/DescriptionTextField";

export const VideoManageMini = (props) => {
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
             >
            <div className={"thumbnail col col-span-2 w-full flex justify-center aspect-ratio-container relative"}>
                <img src={`data:image/png;base64,${base64String}`}
                     alt={"An alt"}
                     className={"aspect-ratio-image rounded-lg"}/>
                <VideoLength time={data?.video_length_in_seconds} />
            </div>
            <div className={"col col-span-3 ml-4 flex flex-col justify-between"}>
                <div className={"title text-black text-md font-medium line-clamp-2 px-1"}>
                    {data.title}
                </div>
                <div className={"channel-name text-black/[0.7] text-sm line-clamp-3 break-words px-1"}>
                    <DescriptionTextField description={data.description}/>
                </div>
            </div>
        </div>
    )
}