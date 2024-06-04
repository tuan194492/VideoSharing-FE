import {useForm} from "react-hook-form";
import {userRegister, userUpdate} from "../../../../api/user/auth";
import {toast} from "react-toastify";
import {useContext} from "react";
import {AuthContext} from "../../../../context/AuthContext";

export const BasicInfoManage = (props) => {

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
            email: user.email,
            id: user.id
        }
        const createResult = await userUpdate(token, data);
        console.log(createResult);
        if (createResult.success) {
            toast.success(createResult.message)
            authContext.user = createResult.data.user;
        }
        else toast.error(createResult.message)
    };

    return (
        <div className={'p-2 mt-4 flex flex-col justify-start relative'}>
            <form className={'w-full'}  onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input readOnly={true} type="email" id="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="name@hust.edu.vn"
                           value={user.email}
                           required/>
                </div>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="name"
                           className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <div className={'text-black/[0.3] text-sm mb-2'}>
                        Choose a channel name that represents you and your content.
                    </div>
                    <input type="text" id="name"
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           defaultValue={user.name}
                           {...register('name', { required: true })}
                           required/>
                </div>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="shortname"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short name</label>
                    <div className={'text-black/[0.3] text-sm mb-2'}>
                        Choose your unique handle by adding letters and numbers. Example: @Tuan123
                    </div>
                    <input type="text" id="shortname"
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           defaultValue={user.shortname}
                           {...register('shortname', { required: true })}
                           required/>
                </div>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="facebook"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook</label>
                    <div className={'text-black/[0.3] text-sm mb-2'}>
                        Link to your facebook.
                    </div>
                    <input type="text"
                           id="facebook"
                           defaultValue={user.facebook}
                           {...register('facebook', { required: false })}
                           className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="relative z-0 w-[50%] mb-8 group ">
                    <label htmlFor="message"
                           className="block mb-2 text-sm font-medium text-gray-900">Your
                        description</label>
                    <div className={'text-black/[0.3] text-sm mb-2'}>
                        Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places.
                    </div>
                    <textarea id="message" rows="4"
                              aria-label={'Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places.'}
                              className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  :bg-gray-700  :border-gray-600  :placeholder-gray-400  :text-white  :focus:ring-blue-500  :focus:border-blue-500"
                              defaultValue={user.description}
                              {...register('description', { required: false })}
                              placeholder="Description"
                    ></textarea>
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