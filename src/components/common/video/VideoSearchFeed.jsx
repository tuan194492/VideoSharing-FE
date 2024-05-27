import {ImageUtils} from "../../../utils/images/ImageUtils";
import {DateUtils} from "../../../utils/date/DateUtils";
import {useNavigate} from "react-router-dom";
import VideoLength from "./VideoLength";

export const VideoSearchFeed = (props) => {
    const video = props.video;
    const navigate = useNavigate();
    return (
        <div key={props.index * 2}
             className='grid grid-cols-12 cursor-pointer p-2 hover:bg-gray-100 w-[90%]'
             onClick={event => {
                 navigate(`/user/video/detail/${video.id}`)
             }}>
            <div className={'thumbnail col col-span-2 w-full flex justify-center aspect-ratio-container relative' }>
                <img className='aspect-ratio-image rounded-lg'
                     src={ImageUtils.createImageSrcFromBuffer(video.thumbnail.data)}/>
                <VideoLength time={video.video_length_in_seconds}/>
            </div>

            <div className='col col-span-10 ml-8 flex flex-col justify-between'>
                <h3 className='text-md sm:text-lg md:text-xl traking-wide font-normal text-[#0f0f0f] leading-[19px] sm:leading-[22px] md:leading-[24px]'>
                    {video.title}
                </h3>
                <span className='text-[#606060] text-[12px]'>{DateUtils.getPostedSince(video.createdAt) + ' ago'}</span>
                <h4 className='font-medium text-[#606060]  text-[12px] sm:my-1'>{'aaa'}</h4>
                <p className='traking-wider font-normal text-[10px] sm:text-[#0f0f0f] text-[13px] leading-[16px] break-words line-clamp-2'>{video.description}</p>
            </div>
        </div>
    )
}