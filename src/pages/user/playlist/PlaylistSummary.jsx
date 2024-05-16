import {useContext, useEffect, useState} from "react";
import {PlayListMini} from "../../../components/common/playlist/PlayListMini";
import {playlistService} from "../../../api/user/playlist";
import {AuthContext} from "../../../context/AuthContext";
import {toast} from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import {ThreeCircles} from "react-loader-spinner";
import {VideoMini} from "../../../components/common/homepage/VideoMini";
import {DropdownButton, DropDownButton} from "../../../components/common/button/DropDownButton";

export const PlaylistSummary = (props) => {
    const [playlistList, setPlaylistList] = useState([]);
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const fetchPlaylistListData = async () => {
        const result = await playlistService.getPlaylistListByUser(token);
        if (result.success) {
            setHasMore(false);
            return setPlaylistList(result.data);
        }
        toast.error(result.message);
    }

    const initData = async () => {
        await fetchPlaylistListData();
    }

    const fetchMoreData = async () => {

    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <div
            className={'flex justify-center flex-col'}
        >
            <div className={'font-extrabold text-4xl ml-3'}>
                Playlist:
            </div>
            <DropdownButton options={[{
                value: 'A-Z',
                label: 'A-Z'
            },
                {
                    value: 'Recently added',
                    label: 'Recently added'
                }
            ]}/>
            <InfiniteScroll
                dataLength={playlistList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<ThreeCircles/>}
                scrollThreshold="0.8"
                scrollableTarget={"playlistList"}
            >
                <div
                    id="playlistList"
                    className={'grid sm:grid-cols-1 md:grid-cols-3 p-1 gap-1 mt-6'}>
                    {playlistList && playlistList.map(playlist => <PlayListMini data={playlist}/>)}
                </div>
            </InfiniteScroll>
            {
                hasMore && <button onClick={fetchMoreData}>
                    Show more
                </button>
            }

        </div>

    )
}