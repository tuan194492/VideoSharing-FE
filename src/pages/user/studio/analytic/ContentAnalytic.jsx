import {UploadVideosCard} from "../../../../components/dashboard/UploadVideosCard";
import {ChannelDashboardCard} from "../../../../components/dashboard/ChannelDashboardCard";
import {TopWatchedVideo} from "../../../../components/dashboard/TopWatchedVideo";
import {ViewAnalytic} from "../../../../components/dashboard/ViewAnalytic";
import {HlsVideoPlayer} from "../../../../components/common/video/HlsVideoPlayer";

export const ContentAnalytic = (props) => {
    return (
        <div className={'grid grid-cols-4'}>
            <div className={'col-span-2 p-4 mt-2'}>
                <ViewAnalytic/>
            </div>
            <div className={'col-span-2 p-4 mt-2'}>
                <HlsVideoPlayer src={'http://localhost:3000/1/11/index.m3u8'} />
            </div>


        </div>
    )
}