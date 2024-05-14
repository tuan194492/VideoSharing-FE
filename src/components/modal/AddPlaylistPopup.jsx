import Popup from "reactjs-popup";
import {useContext, useEffect, useState} from "react";
import {MyButton} from "../common/button/MyButton";
import {IMAGES} from "../../utils/images/images";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import './index.css';
import {playlistService} from "../../api/user/playlist";
import {toast} from "react-toastify";
import {AuthContext} from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import {CreatePlaylistButton, CreatePLaylistButton} from "../common/button/CreatePLaylistButton";
import {AddToPlaylistCheckBox} from "./AddToPlaylistCheckBox";

const columns = [
    {
        accessor: 'isAddedToPlaylist',
        filterable: false,
        sortable: false,
        Cell: props => <AddToPlaylistCheckBox data={props} />,

    },
    {
        accessor: 'title',
        sortable: false,
        Cell: props => <div className={'flex justify-center items-center h-[100%]'}>
            <label htmlFor="vue-checkbox"
                   className="w-full py-3 ms-2 text-sm font-medium text-gray-900 break-words whitespace-pre-line">
                {props.value}
            </label>
        </div>,
    }
]

let handleAddToPlaylist;

const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).includes(filter.value) : true
}
export const AddPlaylistPopup = (props) => {
    const [open, setOpen] = useState(false);
    let [playlist, setPlaylist] = useState([]);
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const user = authContext.user;
    const params = useParams();
    console.log(props.videoId)
    const videoId = props.videoId > 0 ? props.videoId :params.id;

    const initData = async () => {
        const result = await playlistService.getPlaylistListByUser(token);
        console.log(result)
        if (result.success) {
            playlist = result.data;
            setPlaylist(result.data);
        }
    }

    const initFunction = () => {
        handleAddToPlaylist = async (e, props) => {
            e.stopPropagation();
            const newPLaylist = [...playlist];

            const currentPlaylist = props.row;
            // console.log(props.row);
            const result = await playlistService.addToPlaylist(videoId, currentPlaylist.playlist_id, token);
            if (result.success) {
                newPLaylist[props.row._index] = {
                    ...newPLaylist[props.row._index],
                    added_to_playlist: result.added_to_playlist
                };
                playlist = newPLaylist;
                setPlaylist(newPLaylist);
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }

        }

    }

    const init = async () => {
        await initData();
        initFunction();
    }

    useEffect(() => {
        init();
    }, []);
    const closeModal = () => setOpen(false);
    return (
        <div>
            <MyButton title={"Add to playlist"} icon={IMAGES.icon.addPlaylist} callback={() => setOpen(true)}/>
            <Popup nested contentStyle={{width: '20%'}} open={open} closeOnDocumentClick onClose={closeModal}>
                <div className={'modal p-2'}>
                    <div className={'text-lg p-2'}>
                        Save video to..
                    </div>
                    <div>
                        <ReactTable
                            data={playlist}
                            columns={columns}
                            defaultPageSize={4}
                            filterable={false}
                            defaultFilterMethod={filterMethod}
                            minRows={4}
                            showPageSizeOptions={false}
                        />
                    </div>
                    <div className={'flex justify-center'}>
                        <CreatePlaylistButton nested />
                    </div>

                </div>
            </Popup>
        </div>
    );
}