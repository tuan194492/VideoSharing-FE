import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useForm} from "react-hook-form";
import {playlistService} from "../../../api/user/playlist";
import {toast} from "react-toastify";

export const PlaylistDetailPopup = (props) => {
    const [playlist, setPlaylist] = useState(props.data);
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        const result = await playlistService.createPlaylist(data, token);
        if (!result.success) {
            return toast.error(result.message);
        }
        props.closeModel();
    }

    return (
        <div className="flex w-full justify-center items-center">
                <form
                    className="w-full bg-white rounded-md shadow-2xl p-5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="text-blue-700 font-bold text-2xl mb-1 hover:text-blue-900">
                        Update playlist
                    </h1>
                    <p className="text-sm font-normal text-gray-600 mb-8"></p>
                    <div className="mb-5 text-red-500 text-xs">
                        <label htmlFor="title"
                               className="block mb-2 text-sm font-medium text-gray-900">Title
                        </label>
                        <div className="flex items-center border-2 mb-1 py-2 px-3 rounded-2xl">
                            <input
                                id="title"
                                className=" pl-2 w-full outline-none border-none text-base text-[#757575]"
                                type="text"
                                placeholder="Title"
                                defaultValue={playlist.title}
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
                        <label htmlFor="description"
                               className="block mb-2 text-sm font-medium text-gray-900">Description
                        </label>
                        <div className="flex items-center border-2 mb-1 py-2 px-3 rounded-2xl ">
                            <textarea
                                className="pl-2 w-full outline-none border-none text-base text-[#757575]"
                                rows="4"
                                id="description"
                                placeholder="Description"
                                defaultValue={playlist.description}
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
                                   defaultValue={playlist.status}
                                   {...register("isPublic")}
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
                            className="block w-[100px] bg-blue-500 py-2 rounded-md hover:bg-blue-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                        >
                            Update
                        </button>
                    </div>
                </form>
        </div>
    )
}

