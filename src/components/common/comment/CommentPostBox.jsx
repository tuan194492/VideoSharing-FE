
export const CommentPostBox = (props) => {
    return (
        <div className="bg-white rounded-lg border p-2 mx-auto">
            <div className="px-3 mb-2 mt-2">
                <textarea autoFocus={props.autoFocus}  placeholder={props.holder || "Post your comment here ..."} className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"></textarea>
            </div>
            <div className="flex justify-end px-4 gap-4">
                <button className="px-2.5 py-1.5 rounded-md text-white text-sm bg-red-500">
                    Cancel
                </button>
                <button className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500">
                    Comment
                </button>
            </div>
        </div>
    )
}