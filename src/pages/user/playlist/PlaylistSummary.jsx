import {useContext, useEffect, useState} from "react";
import {PlayListMini} from "../../../components/common/playlist/PlayListMini";
import {playlistService} from "../../../api/user/playlist";
import {AuthContext} from "../../../context/AuthContext";
import {toast} from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import {ThreeCircles, ThreeDots} from "react-loader-spinner";
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
            <div className={'font-extrabold text-4xl ml-3 '}>
                Playlists
            </div>
            <div className={'w-[20%]'}>
                <DropdownButton
                    className={'mt-6 ml-2'}
                    options={[{
                    value: 'A-Z',
                    label: 'A-Z',
                        onSelect: (option) => {
                        const newPlaylist = [...playlistList].sort((a, b) => {
                            return (a.title < b.title) ? 1 : -1;
                        })
                        console.log(newPlaylist);
                        setPlaylistList(newPlaylist);
                    }
                },
                    {
                        value: 'Z-A',
                        label: 'Z-A',
                        onSelect: (option) => {
                            const newPlaylist = [...playlistList].sort((a, b) => {
                                return (a.title > b.title) ? 1 : -1;
                            })
                            console.log(newPlaylist);
                            setPlaylistList(newPlaylist);
                        }
                    },
                    {
                        value: 'Recently added',
                        label: 'Recently added',
                        onSelect: (option) => {
                            const newPlaylist = [...playlistList].sort((a, b) => {
                                return (a.createdAt < b.createdAt) ? 1 : -1;
                            })
                            setPlaylistList(newPlaylist);
                        }
                    },
                    {
                        value: 'Recently updated',
                        label: 'Recently updated',
                        onSelect: (option) => {
                            const newPlaylist = [...playlistList].sort((a, b) => {
                                return (a.updatedAt < b.updatedAt) ? 1 : -1;
                            })
                            setPlaylistList(newPlaylist);
                        }
                    }

                ]}/>
            </div>

            <InfiniteScroll
                dataLength={playlistList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<ThreeDots/>}
                scrollThreshold="0.8"
                scrollableTarget={"playlistList"}
            >
                <div
                    id="playlistList"
                    className={'grid sm:grid-cols-3 md:grid-cols-5 p-1 gap-6 mt-10'}>
                    {playlistList && playlistList.map(playlist => <PlayListMini key={playlist.id} data={playlist}/>)}
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