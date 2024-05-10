import Popup from "reactjs-popup";
import {useEffect, useState} from "react";
import {MyButton} from "../common/button/MyButton";
import {IMAGES} from "../../utils/images/images";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import './index.css';
import {playlistService} from "../../api/user/playlist";
const columns = [
    {
        accessor: 'added_to_playlist',
        filterable: false,
        sortable: false,
        Cell: props => <div className={'flex justify-center items-center h-[100%]'}>
                <input
                    id="vue-checkbox"
                    type="checkbox"
                    value={props.value}
                    className={'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'}
                />
             </div>,

    },
    {
        accessor: 'playlist_mame',
        sortable: false,
        Cell: props => <div className={'flex justify-center items-center h-[100%]'}>
            <label htmlFor="vue-checkbox"
                   className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Vue
                {props.value}
            </label>
        </div>,
    }
]

const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).includes(filter.value) : true
        }

            export const AddPlaylistPopup = (props) => {
            const [open, setOpen] = useState(false);
            const [playlist, setPlaylist] = useState([]);
            const initData = async () => {
            const result = await playlistService.getPlaylistListByUser();
            if (result.success) {
            setPlaylist(result.data);
        }
        }

            useEffect(() => {
            initData();
        }, []);
            const closeModal = ()  => setOpen(false);
            return (
            <div>
            <MyButton title={"Add to playlist"} icon={IMAGES.icon.addPlaylist} callback={() => setOpen(true)}/>
    <Popup contentStyle={{width: '20%'}} open={open} closeOnDocumentClick onClose={closeModal} >
                <div className={'modal p-2'}>
                    <div className={'text-lg p-2'}>
                        Save video to..
                    </div>
                    <div>
                        <ReactTable
                            getTrProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e) => {
                                        console.log(JSON.stringify(state));
                                        console.log(JSON.stringify(rowInfo));
                                        console.log(JSON.stringify(column));

                                    }
                                }
                            }}
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
                        <MyButton
                            icon={IMAGES.icon.addButton}
                            className={'bg-gray-200 w-[40%] mt-3 p-1 font-medium'}
                            title={'Create new playlist'} />
                    </div>

                </div>
            </Popup>
        </div>
    );
}