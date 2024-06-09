import React, {useContext, useState} from 'react';
import {reportService} from "../../../api/user/report";
import {AuthContext} from "../../../context/AuthContext";
import {toast} from "react-toastify";

export const ReportPopup = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setRemark(event.target.value);
    };

    const [remark, setRemark] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Selected option:', selectedOption);
        console.log(`props `, JSON.stringify(props))
        const result = await reportService.createReport(token, {
            description: remark,
            type: props.type,
            videoId: props.video_id,
            channelId: props.channel_id,
            commentId: props.comment_id
        })
        if (result.success) {
            toast.success('Report has been submitted');
            props.onSuccess && props.onSuccess();
        } else {
            toast.error(result.message)
        }
        // Handle the submission logic here
    };

    return (
        <div className="p-6 w-full mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Report video</h2>
            <form onSubmit={handleSubmit}>
                {[
                    'Sexual content',
                    'Violent or repulsive content',
                    'Hateful or abusive content',
                    'Harassment or bullying',
                    'Harmful or dangerous acts',
                    'Misinformation',
                    'Child abuse',
                    'Promotes terrorism',
                    'Spam or misleading',
                    'Legal issue',
                    'Captions issue',
                ].map((option, index) => (
                    <div key={index} className="flex items-center mt-2">
                        <input
                            id={option}
                            name="reportOption"
                            type="radio"
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleOptionChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={option} className="ml-4 block text-sm font-normal text-gray-500">
                            {option}
                        </label>

                    </div>
                ))

                }
                <div className="flex items-center mt-2">
                    <input
                        id={'other'}
                        name="reportOption"
                        type="radio"
                        value={'other'}
                        checked={selectedOption === 'other'}
                        onChange={handleOptionChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={'other'} className="ml-4 block text-sm font-normal text-gray-500">
                        Other
                    </label>
                </div>
                <div className="flex items-center mt-4">
                    <textarea
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-50"
                        onChange={e => {
                            setRemark(e.target.value)
                        }}
                        value={remark}
                    />
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={e => {
                            setRemark('')
                        }}
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

