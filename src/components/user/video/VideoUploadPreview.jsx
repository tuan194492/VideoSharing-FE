import VideoPlayer from "../../common/video/VideoPlayer";
import {useState} from "react";
import {IMAGES} from "../../../utils/images/images";

export default function VideoUploadPreview(props) {
    const {submitVideoAction, video} = props;
    let [currentVideo, setCurrentVideo] = useState(video);
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
            <div className={"grid grid-cols-6"}>
                <div className={"col col-span-6 flex flex-col items-center"}>
                    <img src={IMAGES.icon.uploadIcon} className={"w-[150px] h-[150px]"}/>
                    <input type="file"
                           accept="video/mp4,video/x-m4v,video/*"
                           className={"border-none ml-[120px] opacity-0" }
                           onChange={uploadVideo}
                    />
                </div>
                <div className={"col col-span-6 text-center mt-[30px]"}>
                    <p className={"text-gray-900 text-xl"}>
                        Select Video files to upload <br/>
                    </p>
                    <p className={"text-gray-500"}>
                        or drag and drop video files
                    </p>
                </div>
                <div className={"col col-span-6  text-center mt-[60px]"}>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                            type="submit"
                            onClick={submitVideoAction}>
                        Upload Video
                    </button>
                </div>

            </div>
        );
    } // Video Preview
    else {
        return (
            <div className={"grid grid-cols-6"}>
                <div className={"col col-span-6 flex flex-col items-center"}>
                    <VideoPlayer video={currentVideo}/>
                </div>
                <div className={"col col-span-6  text-center mt-[60px]"}>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                            type="submit"
                            onClick={submitVideoAction}>
                        Upload Video
                    </button>
                </div>
            </div>
        );
    }
}