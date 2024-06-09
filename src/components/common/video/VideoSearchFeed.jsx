import {ImageUtils} from "../../../utils/images/ImageUtils";
import {DateUtils} from "../../../utils/date/DateUtils";
import {useNavigate} from "react-router-dom";
import VideoLength from "./VideoLength";
import {AuthContext} from "../../../context/AuthContext";
import {useContext} from "react";

export const VideoSearchFeed = (props) => {
    const video = props.video;
    console.log(video)
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    console.log(authContext)
    const role = authContext.role ? authContext.role.replaceAll('"', '') : 'guest';
    return (
        <div key={props.index * 2}
             className={'grid grid-cols-12 cursor-pointer p-2 hover:bg-gray-100 w-[90%] ' + props.className}
             onClick={event => {
                 navigate(`/${role}/video/detail/${video.id}`)
             }}>
            <div className={'thumbnail col col-span-3 w-full flex justify-center aspect-ratio-container relative' }>
                <img className='aspect-ratio-image rounded-lg border-2 border-gray-200'
                     src={ImageUtils.createImageSrcFromBuffer(video.thumbnail.data)}/>
                <VideoLength time={video.video_length_in_seconds}/>
            </div>

            <div className='col col-span-9 ml-4 flex flex-col justify-start'>
                <h3 className='text-md sm:text-lg md:text-xl traking-wide font-normal text-[#0f0f0f] leading-[19px] sm:leading-[22px] md:leading-[24px]'>
                    {video.title}
                </h3>
                <span className='text-[#606060] text-[12px]'>{DateUtils.getPostedSince(video.createdAt) + ' ago'}</span>
                <h4 className='font-medium text-[#606060]  text-[12px] sm:my-1'>{video.User?.name}</h4>
                <p className='traking-wider font-normal text-[10px] sm:text-[#0f0f0f] text-[13px] leading-[16px] break-words line-clamp-2 mt-[2px]'>{video.description}</p>
            </div>
        </div>
    )
}