import {useState} from "react";
import {IMAGES} from "../../../../utils/images/images";
import VideoUploadPreview from "../../../../components/user/video/VideoUploadPreview";
import VideoPlayer from "../../../../components/common/video/VideoPlayer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faTrash, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import VideoPreview from "../../../../components/common/video/VideoPreview";

export const VideoUploadPageStepOne = (props) => {
    const [currentVideo, setCurrentVideo] = useState(props.uploadedVideo);

    const handleUploadVideo = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentVideo(file);
            props.setUploadedVideo(file);
        }
    }

    const handleDeleteVideo = (e) => {
        setCurrentVideo(null);
    }

    if (currentVideo == null) {
        return (
            <div className={props.className}>
                <label htmlFor={'file-upload'} className={'flex flex-col items-center'}>
                    {IMAGES.icon.uploadButton}
                    <div className={"text-center mt-[30px]"}>
                        <p className={"text-gray-900 text-xl"}>
                            Select Video files to upload <br/>
                        </p>
                        <p className={"text-gray-500"}>
                            or drag and drop video files
                        </p>
                    </div>
                </label>
                <input id={'file-upload'} type={'file'} accept={'video/mp4'} title={'Upload'} className={'hidden'}
                       onChange={handleUploadVideo}/>
            </div>
        )
    } else {
        return (
            <div className={props.className}>
                <VideoPreview width={'60%'} height={'60%'} video={currentVideo}/>
                <div className={"text-center mt-[10px]"}>
                    <button className="text-red-900 font-bold py-2 px-4 rounded-full"
                            type="submit"
                            title="Abort"
                            onClick={handleDeleteVideo}>
                        <FontAwesomeIcon icon={faTrash} className={'min-w-25 min-h-25'} />
                    </button>
                    <button className="text-green-900 font-bold py-2 px-4 rounded-full w-25 h-25"
                            type="submit"
                            title="Submit"
                            onClick={props.handleSubmitStepOne}>
                        <FontAwesomeIcon icon={faArrowRight}  className={'min-w-25 min-h-25'} />
                    </button>
                </div>
            </div>
        )
    }

}