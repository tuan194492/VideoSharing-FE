import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {videoService} from "../../../../api/user/video";
import {ImageUtils} from "../../../../utils/images/ImageUtils";
import {StringUtils} from "../../../../utils/string/StringUtils";
import {DateUtils} from "../../../../utils/date/DateUtils";
import {VideoSearchFeed} from "../../../../components/common/video/VideoSearchFeed";
import {Error404Page} from "../../../common/Error404Page";
import {NoContentPage} from "../../../common/NoContentPage";

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
    }, [params.get('param')]);

    return (
        <div>
            <div className={`pl-0 w-100% flex flex-col gap-y-5`}>
                {videoList && videoList.length > 0 ?
                    videoList.map((e, index) => {
                        return (
                            <VideoSearchFeed video={e} index={index}/>
                        )
                    })
                    :
                    <div className={'translate-y-[-100px]'}>
                        <NoContentPage />
                    </div>

                }
            </div>
        </div>
    )
}