import {useContext} from "react";
import {AuthContext} from "../../../../context/AuthContext";
import {useForm} from "react-hook-form";
import {userChangePassword} from "../../../../api/user/auth";
import {toast} from "react-toastify";

export const UserChangePassword = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const user = authContext.user;
    console.log(user);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const resetData = (e) => {
        reset();
    }

    const onSubmit = async (data) => {
        console.log("Submit")
        console.log(data);
        data = {
            ...data,
            id: user.id
        }
        const createResult = await userChangePassword(token, data);
        console.log(createResult);
        if (createResult.success) {
            toast.success(createResult.message)
        }
        else toast.error(createResult.message)
    };

    return (
        <div className={'p-2 mt-4 flex flex-col justify-start relative'}>
            <form className={'w-full'}  onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="old-password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old password</label>
                    <input type="password" id="old-password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Your old password"
                           {...register('oldPassword', { required: true })}
                           required/>
                </div>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="new-password"
                           className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                    <div className={'text-black/[0.3] text-sm mb-2'}>
                        Your new password
                    </div>
                    <input type="password" id="new-password"
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           {...register('newPassword', { required: true })}
                           required/>
                </div>
                <div className={'absolute right-0 top-[-60px]'}>
                    <button
                        className="px-2.5 py-1.5 rounded-lg text-md text-white bg-gray-400 hover:bg-gray-500 transition-colors"
                        type={'button'}
                        onClick={resetData}
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