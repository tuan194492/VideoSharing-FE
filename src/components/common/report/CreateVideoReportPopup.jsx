import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useParams} from "react-router-dom";
import {playlistService} from "../../../api/user/playlist";
import {toast} from "react-toastify";
import {MyButton} from "../button/MyButton";
import {IMAGES} from "../../../utils/images/images";
import Popup from "reactjs-popup";
import ReactTable from "react-table-6";
import {CreatePlaylistButton} from "../button/CreatePLaylistButton";
import {ReportPopup} from "./ReportPopup";
import {BsFlag} from "react-icons/bs";
import {ReportType} from "../../../utils/enum/ReportType";

export const CreateVideoReportPopup = (props) => {
    const [open, setOpen] = useState(false);
    const authContext = useContext(AuthContext);
    const token = authContext.token;

    const params = useParams();
    const videoId = props.videoId > 0 ? props.videoId : params.id;

    const closeModal = () => setOpen(false);
    return (
        <div>
            <MyButton title={"Report"} icon={<BsFlag size={20}/>} callback={() => setOpen(true)}/>
            <Popup nested contentStyle={{width: '25%'}} open={open} closeOnDocumentClick onClose={closeModal}>
                <div className={'modal'}>
                    <ReportPopup
                        onSuccess={() => closeModal()}
                        video_id={videoId}
                        type={ReportType.Video}
                    />
                </div>
            </Popup>
        </div>
    );
}