import ReactTable from "react-table-6";
import {AddToPlaylistCheckBox} from "../../../../components/modal/AddToPlaylistCheckBox";
import {VideoMini} from "../../../../components/common/video/VideoMini";
import {useContext, useEffect, useState} from "react";
import {videoService} from "../../../../api/user/video";
import {AuthContext} from "../../../../context/AuthContext";
import {VideoManageMini} from "../../../../components/common/video/VideoManageMini";
import {StringUtils} from "../../../../utils/string/StringUtils";

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
        Cell: props => <div className={'text-center'}>
            {StringUtils.capitalizeFirstLetter(props.value)}
        </div>
    },
    {
        accessor: 'views',
        sortable: true,
        filterable: false,
        Header: 'View',
        width: 100,
        Cell: props => <div className={'text-center'}>
            {props.value || 0}
        </div>
    },
    {
        accessor: 'commentCount',
        sortable: true,
        filterable: false,
        Header: 'Comment',
        width: 100,
        Cell: props => <div className={'text-center'}>
            {props.value || 0}
        </div>
    },
    {
        accessor: 'likeCount',
        sortable: true,
        filterable: true,
        Header: 'Like',
        width: 100,
        Cell: props => <div className={'text-center'}>
            {props.value || 0}
        </div>
    },
    {
        accessor: 'dislikeCount',
        sortable: true,
        filterable: true,
        Header: 'Dislike',
        width: 100,
        Cell: props => <div className={'text-center'}>
            {props.value || 0}
        </div>
    },
    {
        accessor: 'createdAt',
        sortable: true,
        filterable: true,
        Header: 'Date',
        width: 250,
        Cell: props => <div className={'text-center'}>
            {StringUtils.formatDate(props.value)}
        </div>
    },
    {
        accessor: 'action',
        sortable: false,
        filterable: false,
        Header: 'Action',
        width: 150,
        Cell: props => <div className={'text-center'}>
            <div className={'text-blue-600 font-semibold cursor-pointer'}>
                Edit
            </div>
        </div>
    },
]

const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).includes(filter.value) : true
}

export const ChannelVideoManage = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [videoList, setVideoList] = useState([]);

    const initVideoData = async () => {
        const result = await videoService.fetchVideoList(token, {
            page: 1,
            pageSize: 8
        })
        if (result.success) {
            setVideoList(result.data.data)
        }
    }

    useEffect( () => {
        initVideoData();
    }, []);

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
            />
        </div>
    )
}