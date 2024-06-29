import {useState} from "react";
import {BasicInfoManage} from "../channel/BasicInfoManage";
import {ChannelCustomizeManage} from "../channel/ChannelCustomizeManage";
import {UserChangePassword} from "../channel/UserChangePassword";
import {OverviewAnalytic} from "./OverviewAnalytic";
import {ContentAnalytic} from "./ContentAnalytic";

export const ChannelAnalytic = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const getCurrentPageElement = () => {
        switch (currentPage) {
            case 0:
                return <OverviewAnalytic />
            case 1:
                return <ContentAnalytic />
        }
    }

    return (
        <div>
            <div className={'font-extrabold text-3xl ml-3 '}>
                Channel Analytic
            </div>
            <div
                className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mt-6">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <a href="#"
                           className={"inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 " + (currentPage === 0 ? 'text-blue-600 active border-blue-600 border-b-2' : '')}
                           onClick={(e) => setCurrentPage(0)}
                        >Overview</a>
                    </li>
                    <li className="me-2">
                        <a href="#"
                           className={"inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 " + (currentPage === 1 ? 'text-blue-600 active border-blue-600 border-b-2' : '')}
                           onClick={(e) => setCurrentPage(1)}
                           aria-current="page">Content</a>

                    </li>

                </ul>
            </div>
            <div>
                {getCurrentPageElement()}
            </div>
        </div>

    );
}