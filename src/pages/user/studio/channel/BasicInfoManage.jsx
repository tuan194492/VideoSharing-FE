import {useForm} from "react-hook-form";
import {userRegister} from "../../../../api/user/auth";
import {toast} from "react-toastify";

export const BasicInfoManage = (props) => {
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

    return (
        <div className={'p-2 mt-4 flex flex-col justify-start relative'}>
            <form className={'w-full'}>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input readOnly={true} type="email" id="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="name@hust.edu.vn" required/>
                </div>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="name"
                           className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <div className={'text-black/[0.3] text-sm mb-2'}>
                        Choose a channel name that represents you and your content.
                    </div>
                    <input type="text" id="name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required/>
                </div>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="shortname"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short name</label>
                    <div className={'text-black/[0.3] text-sm mb-2'}>
                        Choose your unique handle by adding letters and numbers. Example: @Tuan123
                    </div>
                    <input type="text" id="shortname"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required/>
                </div>
                <div className="mb-8 w-[50%]">
                    <label htmlFor="facebook"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook</label>
                    <div className={'text-black/[0.3] text-sm mb-2'}>
                        Link to your facebook.
                    </div>
                    <input type="text" id="facebook"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  :bg-gray-700  :border-gray-600  :placeholder-gray-400  :text-white  :focus:ring-blue-500  :focus:border-blue-500"
                              placeholder="Description"
                    ></textarea>
                </div>
                <div className={'absolute right-0 top-[-60px]'}>
                    <button
                        className="px-2.5 py-1.5 rounded-lg text-md text-white bg-gray-400 hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        className=" ml-3 px-2.5 py-1.5 rounded-lg text-md text-white bg-blue-600 hover:bg-blue-800"
                    >
                        Save
                    </button>
                </div>
            </form>

        </div>
    )
}