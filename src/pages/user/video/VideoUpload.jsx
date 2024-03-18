import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useForm} from "react-hook-form";
import VideoUploadPreview from "../../../components/user/video/VideoUploadPreview";

export default function VideoUpload(props) {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const [uploadedVideo, setUploadedVideo] = useState(null);
    const uploadVideo = (video) => {
        setUploadedVideo(video);
    }
    const onSubmit = async (data) => {

    }

    return (
        <div className={"grid grid-cols-12"}>
            <div className={"col-start-2 col-span-8"}>
                <VideoUploadPreview handleUploadVideo={uploadVideo}/>
            </div>
            <div className={"col-span-10"} >

            </div>
            <div className={"col-span-10"}>

            </div>
            <div className="col-span-10">

            </div>
            <div className={"col-span-12"}>

            </div>
        </div>
    );
}