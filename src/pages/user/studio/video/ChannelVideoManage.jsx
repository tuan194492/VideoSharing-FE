import ReactTable from "react-table-6";
import {AddToPlaylistCheckBox} from "../../../../components/modal/AddToPlaylistCheckBox";

const columns = [
    {
        accessor: 'title',
        filterable: true,
        sortable: true,
        Header: 'Title',

    },
    {
        accessor: 'description',
        sortable: true,
        filterable: true,
        Header: 'Description',
    }
]

const data = [
    {
        title: 'Video 1',
        description: 'abc',
    },
    {
        title: 'Video 1',
        description: 'abc'
    },
    {
        title: 'Video 1',
        description: 'abc'
    }
]

const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).includes(filter.value) : true
}

export const ChannelVideoManage = (props) => {
    return (
        <div className={'p-2 mt-8'}>
            <ReactTable
                data={data}
                columns={columns}
                defaultPageSize={8}
                filterable={true}
                defaultFilterMethod={filterMethod}
                minRows={8}
                showPageSizeOptions={true}
            />
        </div>
    )
}