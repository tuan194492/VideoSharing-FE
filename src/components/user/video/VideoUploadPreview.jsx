import VideoWatcher from "../../common/VideoWatcher";
import {useState} from "react";

export default function VideoUploadPreview(props) {
    let [currentVideo, setCurrentVideo] = useState(null);

    const uploadVideo = (e) => {
        if (e.target.files) {
            const uploadedVideo = e.target.files[0];
            setCurrentVideo(uploadedVideo);
            console.log(uploadedVideo);
            console.log(currentVideo);
            props.handleUploadVideo(uploadedVideo);
        }
    }
    // Upload Video
    if (!currentVideo) {
        return (
            <div>
                <form>
                    <input type={"file"} onChange={uploadVideo} />
                    <button type={"submit"} >Upload</button>
                </form>
            </div>
        );
    } // Video Preview
    else {
        return (
            <div>
                <VideoWatcher video={currentVideo}/>
            </div>
        );
    }
}