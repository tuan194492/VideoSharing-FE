import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {videoService} from "../../../../api/user/video";
import {ImageUtils} from "../../../../utils/images/ImageUtils";
import {StringUtils} from "../../../../utils/string/StringUtils";
import {DateUtils} from "../../../../utils/date/DateUtils";

export const VideoSearchPage = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const navigate = useNavigate();
    console.log(params)
    const [videoList, setVideoList] = useState([]);
    const fetchData = async () => {
        const result = await videoService.searchVideo(params.get('param'));
        console.log(result.data.data)
        if (result.success) {
            return result.data.data;
        } else {
            return [];
        }
    }

    const initData = async () => {
        const result = await videoService.searchVideo(params.get('param'));
        console.log(result)
        if (result.success) {
            setVideoList(result.data.data.rows)
        }
        console.log(videoList);
    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <div>
            <div className={`pl-0 pt-4 w-100% flex flex-col gap-y-5`}>
                {videoList &&
                    videoList.map((e, index) => {
                        return (
                            <div key={index * 2} className='flex flex-col gap-y-3 sm:flex-row gap-x-4 md:gap-x-8 w-[98%] justify-center cursor-pointer sm:mx-0'
                                 onClick={event => {
                                     console.log(e)
                                     navigate(`/user/video/detail/${e.id}`)
                                 }} >
                                <img className='w-[97%] sm:w-[29%] md:w-[25%] sm:rounded-[23px] md:h-[25%] object-cover' src={ImageUtils.createImageSrcFromBuffer(e.thumbnail.data)} />
                                <div className='w-[92%] sm:w-[60%] md:w-[70%] lg:w-[60%]'>
                                    <h3 className='text-md sm:text-lg md:text-xl traking-wide font-normal text-[#0f0f0f] leading-[19px] sm:leading-[22px] md:leading-[24px]'>
                                        {e.title}
                                    </h3>
                                    <span className='text-[#606060] text-[12px]'>{DateUtils.getPostedSince(e.createdAt) + ' ago'}</span>
                                    <h4 className='font-medium text-[#606060]  text-[12px] sm:my-1'>{'aaa'}</h4>
                                    <p className='traking-wider font-normal text-[10px] sm:text-[#0f0f0f] text-[13px] leading-[16px] break-words line-clamp-2'>{e.description}</p>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        </div>
    )
}