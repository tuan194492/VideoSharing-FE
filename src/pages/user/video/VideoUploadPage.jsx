import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useForm} from "react-hook-form";
import VideoUploadPreview from "../../../components/user/video/VideoUploadPreview";
import {Stepper} from "../../../components/common/Stepper";
import {UploadVideoStage} from "../../../utils/enum/UploadVideoStage";

export default function VideoUploadPage(props) {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([UploadVideoStage.UPLOAD, UploadVideoStage.DETAIL, UploadVideoStage.SUCCESS]);
    const uploadVideo = (video) => {
        setUploadedVideo(video);
    }
    const onSubmit = async (data) => {

    }

    return (
        <div className={"grid grid-cols-12"}>
            <div className={'col col-span-12 flex justify-center'}>
                <Stepper />
            </div>

            <div className={'col col-span-12'}>
                {}
            </div>
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