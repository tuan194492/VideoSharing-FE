import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {playlistService} from "../../../api/user/playlist";
import {DateUtils} from "../../../utils/date/DateUtils";
import {VideoSearchFeed} from "../../../components/common/video/VideoSearchFeed";
import {useNavigate} from "react-router-dom";
import {ImageUtils} from "../../../utils/images/ImageUtils";
import {IMAGES} from "../../../utils/images/images";
import {NoContentPage} from "../../common/NoContentPage";

export const PlaylistSummaryV2 = (props) =>  {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [playlist, setPlaylist] = useState();
    const fetchData = async () => {
        console.log('aaaaaaaaaaaa')
        const result = await playlistService.getWatchLaterPlaylist(token);
        console.log(result)
        if (result.success) {
            console.log(result.data.data)
            setPlaylist(result.data.data);
        }
    }
    const role = localStorage.getItem("role");
    const page = role?.substring(1, role.length - 1).toLowerCase() || 'guest';
    const initData = async () => {
        await fetchData();
    }

    const navigate = useNavigate();

    useEffect(() => {
        initData();
    }, []);

    return (
        <div className={'grid grid-cols-12'}>
            <div className={'col col-span-3 rounded-3xl h-[80vh] p-8'} style={{
                backgroundColor: '#374e59'
            }}>
                <div className={'aspect-ratio-container'} >
                    <img
                        className={'aspect-ratio-image'}
                        src={playlist?.Videos?.length > 0 ? ImageUtils.createImageSrcFromBuffer(playlist.Videos[0].thumbnail.data) : IMAGES.icon.noImage }/>
                </div>
                <div>
                    <div className="font-sans leading-[3.8rem] text-white font-bold mt-4 text-3xl"
                    >
                        Watch later
                    </div>
                    <div>
                        <div className="font-sans text-[1.4rem] leading-[2rem] font-medium text-white text-sm text-white/[0.7] mt-6"
                        >
                            {playlist?.User?.name}
                        </div>
                        <div className={'font-sans text-[1.4rem] leading-[2rem] font-medium text-white text-sm text-white/[0.7]'}>
                            <div>
                                {playlist?.Videos?.length} videos
                            </div>
                            <div>
                                Last updated on {DateUtils.formatDate(new Date(playlist?.updatedAt))}
                            </div>
                        </div>
                    </div>
                    <div className={'mt-6 flex flex-row justify-center gap-8'}>
                        <button
                            className={'bg-white text-black/[0.7] rounded-full p-2 px-4 font-bold font-sans hover:bg-gray-200 text-md' }
                            onClick={e => {
                                navigate(`/${page}/playlist/detail/${playlist.id}`);
                            }}
                        >
                            Play all
                        </button>
                        <button
                            className={'bg-white text-black/[0.7] rounded-full p-2 px-4 font-bold font-sans hover:bg-gray-200 text-md'}>
                            Shuffle
                        </button>
                    </div>
                </div>
            </div>
            <div className={'col col-span-8 ml-6'}>
                {
                    playlist?.Videos &&
                    playlist?.Videos.map((video, index) => {
                        return <VideoSearchFeed video={video}/>
                    })
                }
                {
                    playlist?.Videos?.length === 0 &&
                    <div className={'translate-y-[-100px]'}>
                        <NoContentPage description={"Maybe you can try to add some video to watch later :)"} />
                    </div>
                }
            </div>
        </div>
    )
}