import {useContext, useEffect, useState} from "react";
import {channelService} from "../../api/user/channel";
import {AuthContext} from "../../context/AuthContext";

export const TopWatchedVideo = (props) => {
    const authContext = useContext(AuthContext);
    const channel = authContext.user;
    const [mostWatchedVideo, setMostWatchedVideo] = useState([])
    const fetchMostWatchedVideo = async () => {
        const result = await channelService.getMostWatchedVideos(channel.id);
        if (result.success) {
            setMostWatchedVideo(result.data.data);
        } else {
            console.log(result.message);
        }
    }

    const initData = async () => {
        await fetchMostWatchedVideo();
    }

    useEffect(() => {
        initData();
    }, [])

    return (
        <div>
            Most watched video
        </div>
    )
}