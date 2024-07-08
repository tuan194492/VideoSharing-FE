import ReactTable from "react-table-6";
import {AddToPlaylistCheckBox} from "../../../../components/modal/AddToPlaylistCheckBox";
import {VideoMini} from "../../../../components/common/video/VideoMini";
import {useContext, useEffect, useState} from "react";
import {videoService} from "../../../../api/user/video";
import {AuthContext} from "../../../../context/AuthContext";
import {VideoManageMini} from "../../../../components/common/video/VideoManageMini";
import {StringUtils} from "../../../../utils/string/StringUtils";
import {CreatePlaylistButton} from "../../../../components/common/button/CreatePLaylistButton";
import Popup from "reactjs-popup";
import {VideoEdit} from "../../../../components/common/video/VideoEdit";
import {toast} from "react-toastify";

const columns = [
    {
        accessor: 'title',
        filterable: true,
        sortable: true,
        Header: 'Video',
        Cell: props => <div className={'p-2'}>
            <VideoManageMini data={props.original} />
        </div>
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
        accessor: 'views',
        sortable: true,
        filterable: false,
        Header: 'View',
        width: 100,
        Cell: props => <div className={'text-center text-black/[0.7] text-md'}>
            {props.value || 0}
        </div>
    },
    {
        accessor: 'commentCount',
        sortable: true,
        filterable: false,
        Header: 'Comment',
        width: 100,
        Cell: props => <div className={'text-center text-black/[0.7] text-md'}>
            {props.value || 0}
        </div>
    },
    {
        accessor: 'likeCount',
        sortable: true,
        filterable: true,
        Header: 'Like',
        width: 100,
        Cell: props => <div className={'text-center text-black/[0.7] text-md'}>
            {props.value || 0}
        </div>
    },
    {
        accessor: 'dislikeCount',
        sortable: true,
        filterable: true,
        Header: 'Dislike',
        width: 100,
        Cell: props => <div className={'text-center text-black/[0.7] text-md'}>
            {props.value || 0}
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
        Cell: props => <div className={'text-center text-black/[0.7] text-md flex justify-center gap-4'}>
            <div className={'text-blue-600 font-semibold cursor-pointer'}
                 onClick={(e) => {
                     openEditPopup(props.original)
                 }}
            >
                Edit
            </div>
            <div className={'text-red-600 font-semibold cursor-pointer'}
                 onClick={(e) => {
                     handleDeleteVideo(props.original)
                 }}
            >
                Delete
            </div>

        </div>
    },
]

let handleDeleteVideo = (video) => {

}

let openEditPopup = (data) => {

}

const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).includes(filter.value) : true
}

export const ChannelVideoManage = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [videoList, setVideoList] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState({});
    const [refresh, setRefresh] = useState(false);
    const closeModal = () => setOpen(false);


    const initVideoData = async () => {
        openEditPopup = (data) => {
            setCurrentVideo(data);
            setOpen(true);
        }
        handleDeleteVideo = async (video) => {
            const result = await videoService.deleteVideo(token, video.id);
            if (result.success) {
                setRefresh(!refresh);
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        }
        const result = await videoService.getVideoByPublisherId(token, authContext.user?.id);
        if (result.success) {
            setVideoList(result.data.data)
        }
    }

    useEffect( () => {
        initVideoData();
    }, [refresh]);

    return (
        <div className={'p-2 mt-8'}>
            <ReactTable
                data={videoList}
                columns={columns}
                defaultPageSize={4}
                filterable={true}
                defaultFilterMethod={filterMethod}
                minRows={4}
                showPageSizeOptions={true}
                getTdProps={(state, rowInfo, column) => ({
                    style: {
                        height: '100%'
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
                    <VideoEdit video={currentVideo} closeModal={closeModal} refresh={e => setRefresh(prev => !prev)} />
                </div>
            </Popup>
        </div>
    )
}