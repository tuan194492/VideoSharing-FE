import {useContext, useEffect, useState} from "react";
import {playlistService} from "../../api/user/playlist";
import {AuthContext} from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

export const AddToPlaylistCheckBox = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [addedToPlaylist, setAddedToPlaylist] = useState(false);
    console.log(props.data.original.id);
    const handleAddToPlaylist = async (e, data) => {
        console.log(data.original, addedToPlaylist)
        if (addedToPlaylist) {
            const result = await playlistService.deleteVideoFromPlaylist(param.id, data.original.id, token);
            if (result.success) {
                toast.success('Remove from playlist successful');
                return setAddedToPlaylist(false);
            }
        }
        const result = await playlistService.addToPlaylist(param.id, data.original.id, token);
        if (result.success) {
            toast.success('Add to playlist successful');
            return setAddedToPlaylist(true);
        }
        return toast.error(result.message);
    }

    const param = useParams();
    console.log(param)
    const initData = async () => {
        const result = await playlistService.isAddedToPlaylist(props.data.original.id, param.id, token);
        console.log(result);
        setAddedToPlaylist(result.isAddedToPlaylist);
    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <div className={'flex justify-center items-center h-[100%]'}>
            <input
                onClick={e => handleAddToPlaylist(e, props.data)}
                id="vue-checkbox"
                type="checkbox"
                checked={addedToPlaylist}
                className={'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'}
            />
        </div>
    )
}