import {MyButton} from "./MyButton";
import {IMAGES} from "../../../utils/images/images";
import ReactTable from "react-table-6";
import Popup from "reactjs-popup";
import {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {playlistService} from "../../../api/user/playlist";
import {AuthContext} from "../../../context/AuthContext";
import {toast} from "react-toastify";

export const CreatePlaylistButton = (props) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        console.log('aaa')
        console.log(data)
        const result = await playlistService.createPlaylist(data, token);
        if (!result.success) {
            return toast.error(result.message);
        }
        setOpen(false);
    }
    return (
        <>
            <MyButton
                callback={() => setOpen(true)}
                icon={IMAGES.icon.addButton}
                className={'bg-gray-200 w-[40%] mt-3 p-1 font-medium'}
                title={'Create new playlist'}/>
            <Popup nested={props.nested} contentStyle={{width: '20%'}} open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="flex w-full justify-center items-center">
                    <div className="w-full px-5">
                        <form
                            className="w-full bg-white rounded-md shadow-2xl p-5"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <h1 className="text-blue-700 font-bold text-2xl mb-1 hover:text-blue-900">
                                CREATE PLAYLIST
                            </h1>
                            <p className="text-sm font-normal text-gray-600 mb-8"></p>
                            <div className="mb-5 text-red-500 text-xs">
                                <div className="flex items-center border-2 mb-1 py-2 px-3 rounded-2xl">
                                    <input
                                        id="title"
                                        className=" pl-2 w-full outline-none border-none text-base text-[#757575]"
                                        type="text"
                                        placeholder="Title"
                                        {...register("title", {required: true, minLength: 5})}
                                    />
                                </div>
                                {errors?.title?.type === "required" && (
                                    <p>⚠ This field is required!</p>
                                )}
                                {errors?.title?.type === "minLength" && (
                                    <p>⚠ Title cannot be less than 5 characters!</p>
                                )}
                            </div>
                            <div className=" text-red-500 text-xs mb-9">
                                <div className="flex items-center border-2 mb-1 py-2 px-3 rounded-2xl ">
                                    <textarea
                                        className="pl-2 w-full outline-none border-none text-base text-[#757575]"
                                        rows="4"
                                        id="description"
                                        placeholder="Description"
                                        {...register("description", {required: true, minLength: 15})}
                                    />
                                </div>
                                {errors?.description?.type === "required" && (
                                    <p>⚠ This field is required!</p>
                                )}
                                {errors?.description?.type === "minLength" && (
                                    <p>⚠ Description cannot be less than 15 characters!</p>
                                )}
                            </div>
                            <div>
                                <label className="inline-flex items-center mb-5 cursor-pointer">
                                    <input type="checkbox"
                                           className="sr-only peer"
                                           id="isPublic"
                                           {...register("isPublic") }
                                           />
                                    <div
                                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  :peer-focus:ring-blue-800 rounded-full peer  :bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all  :border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span
                                        className="ms-3 text-sm font-medium text-gray-900  :text-gray-300">Is Public</span>
                                </label>
                            </div>
                            <div className="w-full flex justify-between">
                                <div className="flex flex-col justify-center space-y-1">

                                </div>
                                <button
                                    type="submit"
                                    className="block w-1/2 bg-blue-500 py-2 rounded-md hover:bg-blue-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Popup>
        </>


    )
}