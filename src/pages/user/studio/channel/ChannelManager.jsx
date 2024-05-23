import {useState} from "react";
import {BasicInfoManage} from "./BasicInfoManage";
import {ChannelCustomizeManage} from "./ChannelCustomizeManage";
import {ChannelLayoutManage} from "./ChannelLayoutManage";

export function ChannelManager() {
    const [currentPage, setCurrentPage] = useState(0);
    const getCurrentPageElement = () => {
        switch (currentPage) {
            case 0:
                return <BasicInfoManage />
            case 1:
                return <ChannelCustomizeManage />
            case 2:
                return <ChannelLayoutManage />
        }
    }

    return (
        <div>
            <div className={'font-extrabold text-3xl ml-3 '}>
                Channel customization
            </div>
            <div
                className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mt-6">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <a href="#"
                           className={"inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 " + (currentPage === 0 ? 'text-blue-600 active border-blue-600 border-b-2' : '')}
                           onClick={(e) => setCurrentPage(0)}
                        >Basic info</a>
                    </li>
                    <li className="me-2">
                        <a href="#"
                           className={"inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 " + (currentPage === 1 ? 'text-blue-600 active border-blue-600 border-b-2' : '')}
                           onClick={(e) => setCurrentPage(1)}
                           aria-current="page">Branding</a>

                    </li>

                </ul>
            </div>
            <div>
                {getCurrentPageElement()}
            </div>
        </div>

    );
}