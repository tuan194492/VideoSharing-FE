import {useContext, useState} from "react";
import {AuthContext} from "../../../../context/AuthContext";
import {useForm} from "react-hook-form";
import VideoUploadPreview from "../../../../components/user/video/VideoUploadPreview";
import {UploadVideoStage} from "../../../../utils/enum/UploadVideoStage";
import {Step, Stepper} from 'react-form-stepper';
import {VideoUploadPageStepOne} from "./VideoUploadPageStepOne";
import {VideoUploadPageStepThree} from "./VideoUploadPageStepThree";
import {VideoUploadPageStepTwo} from "./VideoUploadPageStepTwo";

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
    const [currentStep, setCurrentStep] = useState(1);
    const uploadVideo = (video) => {
        setUploadedVideo(video);
    }
    const onSubmit = async (data) => {

    }

    function goToStepOne() {
        setCurrentStep(1);
    }

    function goToStepTwo() {
        setCurrentStep(2);
    }

    function goToStepThree() {
        setCurrentStep(3);
    }

    return (
        <div className={"grid grid-cols-12"}>
            <div className={'col col-span-12'}>
                <Stepper className={'w-[80vw]'} activeStep={currentStep}>
                    <Step label={UploadVideoStage.UPLOAD} onClick={goToStepOne} />
                    <Step label={UploadVideoStage.DETAIL} onClick={goToStepTwo} />
                    <Step label={UploadVideoStage.SUCCESS} onClick={goToStepThree} />
                </Stepper>
            </div>
            <div className={'col col-span-12'}>
                {currentStep == 1 && <VideoUploadPageStepOne />}
                {currentStep == 2 && <VideoUploadPageStepTwo />}
                {currentStep == 3 && <VideoUploadPageStepThree />}
            </div>

        </div>
    );
}