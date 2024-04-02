import userService, {userService as videoService} from '../../../api/user/video/index'
import {IMAGES} from "../../../utils/images/images";

export const VideoMini = (props) => {
    const {id} = props;
    const fetchPageData = async (videoId) => {
        const data = await videoService.findVideoById();
        return data;
    }
    return (
        <div className={"grid grid-cols-5 cursor-pointer"}>
            <div className={"thumbnail col col-span-2 w-full w-full p-2"}>
                <img src="https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                     alt={"An alt"}
                     className={"object-cover rounded-md"}
                />
            </div>
            <div className={"col col-span-3 p-1 flex flex-col justify-between"}>
                <div className={"title font-bold text-sm line-clamp-2"}>
                    (Full Match) Bomman Hack Não Khiến Em Breach Chạy Lòng Vòng line-clamp-2
                </div>
                <div className={"channel-name text-gray-700 text-sm mb-3"}>
                    <div >
                        Bomman
                    </div>
                    <div className={"detail"}>
                        <span className={"view-count"}>
                            2.9K views
                        </span>
                        <span className={"posted-date ml-4"}>
                            8 hours ago
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}