import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {StringUtils} from "../../../utils/string/StringUtils";
import {playlistService} from "../../../api/user/playlist";
import {toast} from "react-toastify";
import {AuthContext} from "../../../context/AuthContext";
import {IMAGES} from "../../../utils/images/images";

export const PlayListMini = (props) => {
    const playlistId = props.data.id;

    const [playlistThumbnail, setPlaylistThumbnail] = useState();
    const [playlist, setPlaylist] = useState({
        title: '',
        status: '',
        postedSince: 0
    });

    const [videoCount, setVideoCount] = useState(0);
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const page = role?.substring(1, role.length - 1).toLowerCase() || 'guest';

    const base64String = btoa(new Uint8Array(playlistThumbnail?.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));

    const fetchPlaylistData = async () => {
        const result = await playlistService.getPlaylistDetail(token, props.data.id);
        console.log(result);
        if (result.success) {
            console.log(result.data);
            console.log((new Date()).getTime())
            console.log(((new Date()).getTime() - new Date(result.data.data.createdAt)) / 1000)
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
        <div className={"grid grid-cols-5 cursor-pointer " + props.className}
             onClick={e => {
                 navigate(`/${page}/playlist/detail/${playlistId}`);
             }}
            title={playlist.description}
        >
            <div className={"thumbnail col col-span-2 w-full h-full p-2 flex justify-center"}>
                {!playlistThumbnail && <img src={IMAGES.icon.empty}
                                            alt={"An alt"}
                                            className={"object-cover rounded-md h-[15vh] w-[100%]"}/>}
                {playlistThumbnail &&
                    <img src={`data:image/png;base64,${base64String}`}
                     alt={"An alt"}
                     className={"object-cover rounded-md h-[15vh] w-[100%]"}/>
                }
            </div>
            <div className={"col col-span-3 p-1 flex flex-col justify-between"}>
                <div className={"channel-name text-gray-700 text-md bold flex flex-col"}>
                    <span className={"title font-bold text-md line-clamp-2"}>
                        {playlist.title}
                    </span>
                    <span className={"view-count mt-2"}>
                        {playlist.status} Playlist
                    </span>
                    <span className={"posted-date"}>
                        {StringUtils.convertSeconds(playlist.postedSince)} ago
                    </span>

                    <span className={"bold items-end mt-10"}>
                        {videoCount} videos
                    </span>
                </div>

            </div>
        </div>
    )

}