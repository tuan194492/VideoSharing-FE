import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {playlistService} from "../../../api/user/playlist";
import VideoCount from "../../common/video/VideoCount";
import {IMAGES} from "../../../utils/images/images";
import {toast} from "react-toastify";
import {StringUtils} from "../../../utils/string/StringUtils";
import {DescriptionTextField} from "../../common/textfield/DescriptionTextField";
import {ImageUtils} from "../../../utils/images/ImageUtils";

export const PlayListMiniManage = (props) => {
    const playlistId = props.data.id;

    const [playlistThumbnail, setPlaylistThumbnail] = useState(null);
    const [playlist, setPlaylist] = useState({
        title: props.data.title,
        status: props.data.status,
        description: props.data.description,
        postedSince: 0
    });

    const [videoCount, setVideoCount] = useState(0);
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const role = localStorage.getItem("role");
    const page = role?.substring(1, role.length - 1).toLowerCase() || 'guest';

    const base64String = btoa(new Uint8Array(playlistThumbnail?.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));

    const fetchPlaylistData = async () => {
        const result = await playlistService.getPlaylistDetail(token, props.data.id);
        console.log(result);
        if (result.success) {
            if (result.data.data.Videos.length > 0) {
                setPlaylistThumbnail(result.data.data.Videos[0].thumbnail)
                setVideoCount(result.data.data.Videos.length)
            }
            return setPlaylist({
                ...result.data.data,
                postedSince: ((new Date()).getTime() - new Date(result.data.data.createdAt)) / 1000
            });
        }
        toast.error(result.message);
    }

    const initData = async () => {
        await fetchPlaylistData();
    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <div className={"flex flex-col cursor-pointer hover:bg-gray-100 p-4 w-[50%] " + props.className}
             title={playlist.description}
        >
            <div className="aspect-ratio-container relative ">
                <div className={'absolute bg-gray-200 translate-y-[-24px] w-[85%] h-full rounded-[8px] left-[7.5%]'}>

                </div>
                <div className={'absolute bg-gray-300 translate-y-[-16px] w-[90%] h-full rounded-[8px] left-[5%]'}>

                </div>
                <div className={'absolute bg-gray-400 translate-y-[-8px] w-[95%] h-full rounded-[8px] left-[2.5%]'}>

                </div>

                    {!playlistThumbnail &&
                        <img src={ImageUtils.createImageSrcFromBuffer('')}
                             alt={"An alt"}
                             className={"aspect-ratio-image"}/>}
                    {playlistThumbnail &&
                        <img src={`data:image/png;base64,${base64String}`}
                             alt={"An alt"}
                             className={"aspect-ratio-image"}/>
                    }

                <VideoCount count={videoCount}/>
            </div>
            <div className={'flex flex-col'}>
                <div className={"p-2"}>
                    <div className={"text-black text-lg font-semibold line-clamp-2 mt-1"}>
                        {playlist.title}
                    </div>
                    <div className={"channel-name text-black/[0.7] text-sm line-clamp-3 break-words px-1"}>
                        <DescriptionTextField description={playlist.description}/>
                    </div>
                </div>
            </div>
        </div>
    )

}