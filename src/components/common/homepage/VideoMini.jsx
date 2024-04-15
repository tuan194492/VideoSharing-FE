import {IMAGES} from "../../../utils/images/images";
import {StringUtils} from "../../../utils/string/StringUtils";

export const VideoMini = (props) => {
    const data = props.data;
    console.log(data);

    const base64String = btoa(new Uint8Array(data.thumbnail.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    return (
        <div className={'p-1 ' + props.className}>
            <img src={`data:image/png;base64,${base64String}`} />
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
                            {data.views} views
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