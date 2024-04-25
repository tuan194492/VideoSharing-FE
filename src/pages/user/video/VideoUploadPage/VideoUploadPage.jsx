import {useContext, useState} from "react";
import {AuthContext} from "../../../../context/AuthContext";
import {useForm} from "react-hook-form";
import VideoUploadPreview from "../../../../components/user/video/VideoUploadPreview";
import {UploadVideoStage} from "../../../../utils/enum/UploadVideoStage";
import {Step, Stepper} from 'react-form-stepper';
import {VideoUploadPageStepOne} from "./VideoUploadPageStepOne";
import {VideoUploadPageStepThree} from "./VideoUploadPageStepThree";
import {VideoUploadPageStepTwo} from "./VideoUploadPageStepTwo";
import {toast} from "react-toastify";
import {errorMessages} from "../../../../assets/error_messages/error-messages";
import {videoService} from "../../../../api/user/video";

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
    const [uploadedImage, setUploadedImage] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const uploadVideo = (video) => {
        setUploadedVideo(video);
    }

    const onSubmit = async (data) => {

    }

    function handleSubmitStepOne() {
        if (!uploadVideo) {
           return toast.error(errorMessages.EMPTY_VIDEO);
        }

        goToStepTwo();
    }

    async function handleSubmitStepTwo(formDataFromChild) {
        const result = await videoService.uploadVideo(formDataFromChild, uploadedVideo, uploadedImage, token);
        if (result.success) {
            toast.success(result.message);
            goToStepThree();
        } else {
            toast.error(result.message);
        }
    }

    function goToStepOne() {
        setCurrentStep(0);
        console.log(uploadedVideo)
    }

    function goToStepTwo() {
        setCurrentStep(1);
    }

    function goToStepThree() {
        setCurrentStep(2);
    }

    return (
        <div className={"grid grid-cols-12 h-full"}>
            <div className={'col col-span-12 flex justify-center'}>
                <Stepper className={'w-[80vw]'} activeStep={currentStep}>
                    <Step label={UploadVideoStage.UPLOAD} onClick={goToStepOne} disabled={currentStep === 2}/>
                    <Step label={UploadVideoStage.DETAIL} onClick={goToStepTwo} disabled={currentStep === 2 || uploadedVideo == null || (uploadedVideo != null && currentStep == 0)} />
                    <Step label={UploadVideoStage.SUCCESS} onClick={goToStepThree} />
                </Stepper>
            </div>
            <div className={'col col-start-2 col-span-10 flex justify-center items-center min-h-[70vh] h-[100%] border-2'}>
                {currentStep === 0 &&
                    <VideoUploadPageStepOne uploadedVideo={uploadedVideo}
                                            setUploadedVideo={setUploadedVideo}
                                            handleSubmitStepOne={handleSubmitStepOne}
                    />
                }
                {currentStep === 1 &&
                    <VideoUploadPageStepTwo uploadedVideo={uploadedVideo}
                                            uploadedImage={uploadedImage}
                                            setUploadedImage={setUploadedImage}
                                            handleSubmitStepTwo={handleSubmitStepTwo}
                    />}
                {currentStep === 2 && <VideoUploadPageStepThree />}
            </div>
        </div>
    );
}