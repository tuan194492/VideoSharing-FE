import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import {useNavigate} from "react-router-dom";

export const VideoUploadPageStepThree = (props) => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const page = role?.substring(1, role.length - 1).toLowerCase() || 'guest';

    return (
        <div className={'text-center mt-[30px] text-gray-900 text-xl flex flex-col justify-center items-center'}>
            <FontAwesomeIcon icon={faCheckCircle} className={'mb-5 text-green-500'}/>
            Your video has been submitted successfully. <br />
            Please wait for system approval.

            <button type="button"
                    className="w-[50%] mt-[20px] focus:outline-none text-white bg-blue-400 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    onClick={e => {
                        navigate(`/${page}/homepage`)
                    }}
            >Go to homepage
            </button>

        </div>
    )
}