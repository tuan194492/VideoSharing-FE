import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {videoService} from "../../../api/user/video";
import ReactTable from "react-table-6";
import Popup from "reactjs-popup";
import {VideoEdit} from "../../common/video/VideoEdit";
import {VideoManageMini} from "../../common/video/VideoManageMini";
import {StringUtils} from "../../../utils/string/StringUtils";
import {PlayListMini} from "../../common/playlist/PlayListMini";
import {playlistService} from "../../../api/user/playlist";
import {toast} from "react-toastify";
import {PlayListMiniManage} from "./PlaylistMiniManage";
import {PlaylistDetailPopup} from "./PlaylistDetailPopup";

const columns = [
    {
        accessor: 'title',
        filterable: true,
        sortable: true,
        Header: 'Playlist',
        Cell: props => <div className={'p-4 '}>
            <PlayListMiniManage data={props.original} />
        </div>,
        width: '100%'
    },
    {
        accessor: 'status',
        sortable: true,
        filterable: true,
        Header: 'Visibility',
        width: 100,
        Cell: props => <div className={'text-center text-black/[0.7] text-md'}>
            {StringUtils.capitalizeFirstLetter(props.value)}
        </div>
    },
    {
        accessor: 'createdAt',
        sortable: true,
        filterable: true,
        Header: 'Date',
        width: 250,
        Cell: props => <div className={'text-center text-black/[0.7] text-md'}>
            {StringUtils.formatDate(props.value)}
        </div>
    },
    {
        accessor: 'action',
        sortable: false,
        filterable: false,
        Header: 'Action',
        width: 150,
        Cell: props => <div className={'text-center text-black/[0.7] text-md'}>
            <div className={'text-blue-600 font-semibold cursor-pointer'}
                 onClick={(e) => {
                     openEditPopup(props.original)
                 }}
            >
                Edit
            </div>
        </div>
    },
]

let openEditPopup = (data) => {

}

const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).includes(filter.value) : true
}

export const PlaylistDetailManage = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [playlistList, setPlaylistList] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState({});
    const closeModal = () => setOpen(false);


    const fetchPlaylistListData = async () => {
        const result = await playlistService.getPlaylistListByUser(token);
        if (result.success) {
            return setPlaylistList(result.data);
        }
        toast.error(result.message);
    }

    const initData = async () => {
        openEditPopup = (data) => {
            setCurrentPlaylist(data);
            setOpen(true);
        }
        await fetchPlaylistListData();
    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <div className={'p-2 mt-8'}>
            <ReactTable
                data={playlistList}
                columns={columns}
                defaultPageSize={4}
                filterable={true}
                defaultFilterMethod={filterMethod}
                minRows={4}
                showPageSizeOptions={true}
                getTdProps={(state, rowInfo, column) => ({
                    style: {
                        height: '100%',
                        width: '100%'
                    },

                })}
                getTheadThProps={(state, rowInfo, column) => ({
                    style: {
                        height: '60px',
                        textAlign: 'center',
                        paddingTop: '20px'
                    },
                })}
            />
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className={'modal p-2 w-full'}>
                    <PlaylistDetailPopup data={currentPlaylist} closeModel={() => {
                        setOpen(false);
                    }}/>
                </div>
            </Popup>
        </div>
    )
}