import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {errorMessages} from "../../../assets/message/error_messages/error-messages";
import {IMAGES} from "../../../utils/images/images";
import ImageWatcher from "./ImageWatcher";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import VideoPreview from "./VideoPreview";
import {AuthContext} from "../../../context/AuthContext";
import VideoPlayer from "./VideoPlayer";
import {StringUtils} from "../../../utils/string/StringUtils";
import {ImageUtils} from "../../../utils/images/ImageUtils";
import {MdDeleteForever, MdOutlineDelete} from "react-icons/md";
import {AiTwotoneDelete} from "react-icons/ai";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

export const VideoEdit = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const user = authContext.user;
    const video = props.video;
    const [uploadedImage, setUploadedImage] = useState(ImageUtils.createImageSrcFromBuffer(video.thumbnail.data));
    const [formData, setFormData] = useState({
        title: video.title || '',
        description: video.description || '',
        isPublic: video.status
    });

    function handleUploadThumbnails(e) {
        console.log(e);
        const file = e.target.files[0];
        if (file) {
            setUploadedImage(file);
        }
    }
    function handleSubmit() {
        if (!uploadedImage) {
            return toast.error(errorMessages.EMPTY_THUMBNAIL);
        }
        if (formData.title == null || formData.title.length < 10) {
            return toast.error(errorMessages.EMPTY_TITLE);
        }
        if (formData.description == null || formData.description.length < 50) {
            return toast.error(errorMessages.EMPTY_DESCRIPTION);
        }
        props.handleSubmitStepTwo(formData);
    }

    const createVideoSrc = (videoId) => {
        console.log(`${baseAdminURL}/video/stream/${videoId}`);
        if (user != null) {
            return `${baseAdminURL}/video/stream/${videoId}?userId=${user.id}`;
        } else {
            return `${baseAdminURL}/video/stream/${videoId}`;
        }
    }

    const [currentVideoSrc, setCurrentVideoSrc] = useState('');
    const initData = () => {
        setCurrentVideoSrc(createVideoSrc(video.id));
    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <div className={'grid grid-cols-6 p-2 h-full'}>
            <div className={'col col-span-4 p-4'}>
                <form className="w-[80%] mx-auto">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="title" id="title"
                               className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " required
                               onChange={e => {
                                   setFormData({
                                       ...formData,
                                       title: e.target.value
                                   })
                               }}
                               defaultValue={formData.title}
                        />
                        <label htmlFor="title"
                               className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus: :text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="message"
                               className="block mb-2 text-sm font-medium text-gray-900">Your
                            description</label>
                        <textarea id="message" rows="4"
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  :bg-gray-700  :border-gray-600  :placeholder-gray-400  :text-white  :focus:ring-blue-500  :focus:border-blue-500"
                                  placeholder="Description"
                                  onChange={e => {
                                      setFormData({
                                          ...formData,
                                          description: e.target.value
                                      })
                                  }}
                                  defaultValue={formData.description}
                        ></textarea>
                    </div>
                    <div className="relative z-0 w-full h-full mb-5 group">
                        <label htmlFor="file-upload"
                               className="block mb-2 text-sm font-medium text-gray-900">Upload Thumbnail
                        </label>
                        {(uploadedImage != null) ||
                            <>
                                <label htmlFor={'file-upload'} className={'flex flex-col items-center'}>
                                    {IMAGES.icon.uploadButton}
                                    <div className={"text-center mt-[30px]"}>
                                        <p className={"text-gray-900 text-xl"}>
                                            Select Thumbnail files to upload <br/>
                                        </p>
                                        <p className={"text-gray-500"}>
                                            or drag and drop file
                                        </p>
                                    </div>
                                </label>
                                <input id={'file-upload'} type={'file'} accept={'image/*'} title={'Upload'}
                                       className={'hidden'}
                                       onChange={handleUploadThumbnails}/>
                            </>
                        }

                        {(uploadedImage == null) ||
                            <div className="aspect-ratio-container relative">

                                {!(uploadedImage instanceof File)
                                    ? <img className={'aspect-ratio-image '} src={uploadedImage}/>
                                    : <img className={'aspect-ratio-image '} src={URL.createObjectURL(uploadedImage)}/>}
                                <div className={'ml-3 flex flex-row gap-4 absolute right-[-45px] top-0'}>
                                    <div className={'text-gray-500 font-semibold cursor-pointer'}
                                         title={'Remove image'}
                                         onClick={(e) => {
                                             setUploadedImage(null);
                                         }}
                                    >
                                        <AiTwotoneDelete size={32}/>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <label className="inline-flex items-center mb-5 cursor-pointer">
                        <input type="checkbox"
                               value={formData.isPublic}
                               className="sr-only peer"
                               onChange={e => {
                                   setFormData({
                                       ...formData,
                                       isPublic: e.target.value
                                   })
                               }}
                                defaultValue={formData.isPublic}
                        />

                        <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  :peer-focus:ring-blue-800 rounded-full peer  :bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all  :border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900  :text-gray-300">Is Public</span>
                    </label>


                </form>
                <div className={'flex justify-center'}>
                    <button
                        className=" ml-3 px-2.5 py-1.5 rounded-lg text-md text-white bg-blue-600 hover:bg-blue-800"
                        type={"submit"}
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>

            </div>
            <div className={'col col-span-2 p-2'}>
                <VideoPlayer videoStc={currentVideoSrc}/>
            </div>
        </div>
    )
}