import {useState} from "react";
import {BasicInfoManage} from "../channel/BasicInfoManage";
import {ChannelCustomizeManage} from "../channel/ChannelCustomizeManage";
import {ChannelLayoutManage} from "../channel/ChannelLayoutManage";
import {PlaylistLayoutManage} from "../../../../components/user/playlist/PlaylistLayoutManage";
import {PlaylistDetailManage} from "../../../../components/user/playlist/PlaylistDetailManage";

export const PlaylistManage = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const getCurrentPageElement = () => {
        switch (currentPage) {
            case 0:
                return <PlaylistDetailManage />
            case 1:
                return <PlaylistLayoutManage />

        }
    }

    return (
        <div>
            <div className={'font-extrabold text-3xl ml-3 '}>
                Playlist Management
            </div>
            <div
                className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mt-6">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <a href="#"
                           className={"inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 " + (currentPage === 0 ? 'text-blue-600 active border-blue-600 border-b-2' : '')}
                           onClick={(e) => setCurrentPage(0)}
                        >Channel playlist</a>
                    </li>
                    <li className="me-2">
                        <a href="#"
                           className={"inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 " + (currentPage === 1 ? 'text-blue-600 active border-blue-600 border-b-2' : '')}
                           onClick={(e) => setCurrentPage(1)}
                           aria-current="page">Layout</a>

                    </li>

                </ul>
            </div>
            <div>
                {getCurrentPageElement()}
            </div>
        </div>

    );
}