import {UploadVideosCard} from "../../../../components/dashboard/UploadVideosCard";
import {ChannelDashboardCard} from "../../../../components/dashboard/ChannelDashboardCard";
import {TopWatchedVideo} from "../../../../components/dashboard/TopWatchedVideo";
import {ViewAnalytic} from "../../../../components/dashboard/ViewAnalytic";
import {HLSVideoPlayer} from "../../../../components/common/video/HlsVideoPlayer";

export const ContentAnalytic = (props) => {
    return (
        <div className={'grid grid-cols-4'}>
            <div className={'col-span-2 p-4 mt-2'}>
                <ViewAnalytic/>
            </div>
            <div className={'col-span-2 p-4 mt-2'}>
                aaaa
                <video width={'100%'} height={'100%'} autoPlay={true}>
                    <source src={'http://localhost:3000/public/1/sample.mp4'} type={'video/mp4'}/>
                </video>
            </div>


        </div>
    )
}