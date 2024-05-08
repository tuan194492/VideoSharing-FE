import Popup from "reactjs-popup";
import {useState} from "react";
import {MyButton} from "../common/button/MyButton";
import {IMAGES} from "../../utils/images/images";

export const AddPlaylistPopup = (props) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    return (
        <div>
            <MyButton title={"Add to playlist"} icon={IMAGES.icon.addPlaylist} callback={() => setOpen(true)} />
            <Popup contentStyle={{width: '20%'}} open={open} closeOnDocumentClick onClose={closeModal} >
                <div className={'modal p-2'}>
                    <div className={'text-lg p-2'}>
                        Save video to..
                    </div>
                    <div>
                        <ul className="w-[100%] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                            <li className="w-full border-b border-gray-200 rounded-t-lg">
                                <div className="flex items-center ps-3">
                                    <input id="vue-checkbox" type="checkbox" value=""
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "/>
                                    <label htmlFor="vue-checkbox"
                                           className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Vue
                                        JS</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg ">
                                <div className="flex items-center ps-3">
                                    <input id="react-checkbox" type="checkbox" value=""
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "/>
                                    <label htmlFor="react-checkbox"
                                           className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">React</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg ">
                                <div className="flex items-center ps-3">
                                    <input id="angular-checkbox" type="checkbox" value=""
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "/>
                                    <label htmlFor="angular-checkbox"
                                           className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Angular</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg">
                                <div className="flex items-center ps-3">
                                    <input id="laravel-checkbox" type="checkbox" value=""
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "/>
                                    <label htmlFor="laravel-checkbox"
                                           className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Laravel</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={'flex justify-center'}>
                        <MyButton
                            icon={IMAGES.icon.addButton}
                            className={'bg-gray-200 w-[40%] mt-3 p-1 font-medium'}
                            title={'Create new playlist'} />
                    </div>

                </div>
            </Popup>
        </div>
    );
}