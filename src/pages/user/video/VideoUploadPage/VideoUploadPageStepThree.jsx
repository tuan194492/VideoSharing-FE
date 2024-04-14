import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";

export const VideoUploadPageStepThree = (props) => {
    return (
        <div className={'text-center mt-[30px] text-gray-900 text-xl flex flex-col justify-center items-center'}>
            <FontAwesomeIcon icon={faCheckCircle} className={'mb-5 text-green-500'}/>
            Your video has been submitted successfully. <br />
            Please wait for system approval.

            <button type="button"
                    className="w-[50%] mt-[20px] focus:outline-none text-white bg-blue-400 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Go to homepage
            </button>

        </div>
    )
}