import {useForm} from "react-hook-form";
import {userRegister} from "../../../../api/user/auth";
import {toast} from "react-toastify";
import AvatarEditor from 'react-avatar-editor'
import {useContext, useState} from "react";
import {AuthContext} from "../../../../context/AuthContext";
import {ImageUtils} from "../../../../utils/images/ImageUtils";
export const ChannelCustomizeManage = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const user = authContext.user;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Submit")
        const createResult = await userRegister(data);
        console.log(createResult);
        if (createResult.success) {
            toast.success(createResult.message)
        }
        else toast.error(createResult.message)
    };

    const [currentAvatar, setCurrentAvatar] = useState(ImageUtils.createImageSrcFromBuffer(user.avatar));
    const [currentBanner, setCurrentBanner] = useState(ImageUtils.createImageSrcFromBuffer(user.banner));



    return (
        <div className={'p-2 mt-4 flex flex-col justify-start relative'}>
            <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="name"
                           className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Picture</label>
                    <div className={'text-black/[0.3] text-sm mb-2'}>
                        Your profile picture will appear where your channel is presented on your video, like next to your videos and comments
                    </div>
                    <div className={'flex flex-row'}>
                        <AvatarEditor
                            image={currentAvatar}
                            width={250}
                            height={250}
                            border={50}
                            color={[255, 255, 255, 0.6]} // RGBA
                            scale={1.2}
                            rotate={0}
                            borderRadius={125}
                        />

                        <div>
                            <div className={'text-black/[0.5] text-sm mb-2 mt-10 ml-3'}>
                                Make sure your picture follows the YouTube Community Guidelines.
                            </div>
                            <div className={'ml-3 flex flex-row gap-4'}>
                                <div>
                                    <label className={'text-blue-600 font-semibold cursor-pointer'}
                                           htmlFor={'file-upload'}>Change</label>
                                    <input id={'file-upload'} type={'file'} accept={'image'} title={'Upload'}
                                           className={'hidden'}
                                           onChange={e => {
                                               console.log(e.target.files[0])
                                               if (e.target.files[0]) {
                                                   setCurrentAvatar(URL.createObjectURL(e.target.files[0]));
                                               }
                                           }}
                                    />
                                </div>

                                <div className={'text-blue-600 font-semibold cursor-pointer'}
                                     onClick={e => {
                                         setCurrentAvatar(null);
                                     }}
                                >
                                    Remove
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="shortname"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Banner Image</label>
                    <div className={'text-black/[0.3] text-sm mb-2'}>
                        This image will appear across the top of your channel
                    </div>
                    <div className={'flex flex-row'}>
                        <AvatarEditor
                            image={currentBanner}
                            width={250}
                            height={100}
                            border={50}
                            color={[255, 255, 255, 0.6]} // RGBA
                            scale={1.2}
                            rotate={0}
                            borderRadius={5}
                            className={'w-[250px] h-[250px]'}
                        />

                        <div>
                            <div className={'text-black/[0.5] text-sm mb-2 mt-10 ml-3'}>
                                Make sure your picture follows the YouTube Community Guidelines.
                            </div>
                            <div className={'ml-3 flex flex-row gap-4'}>
                                <div>
                                    <label className={'text-blue-600 font-semibold cursor-pointer'} htmlFor={'file-upload-banner'}>Change</label>
                                    <input id={'file-upload-banner'}
                                           type={'file'}
                                           accept={'image'}
                                           title={'Upload'}
                                           className={'hidden'}
                                           onChange={e => {
                                               console.log(e.target.files[0])
                                               if (e.target.files[0]) {
                                                   setCurrentBanner(URL.createObjectURL(e.target.files[0]));
                                           }}}
                                    />
                                </div>

                                <div className={'text-blue-600 font-semibold cursor-pointer'}
                                     onClick={e => {
                                         setCurrentBanner(null);
                                     }}     >
                                    Remove
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'absolute right-0 top-[-60px]'}>
                    <button
                        className="px-2.5 py-1.5 rounded-lg text-md text-white bg-gray-400 hover:bg-gray-500 transition-colors"
                        type={'button'}
                    >
                        Cancel
                    </button>
                    <button
                        className=" ml-3 px-2.5 py-1.5 rounded-lg text-md text-white bg-blue-600 hover:bg-blue-800"
                        type={'submit'}
                    >
                        Save
                    </button>
                </div>
            </form>

        </div>
    )
}