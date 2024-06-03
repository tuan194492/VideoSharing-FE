import {UploadVideosCard} from "../../../../components/dashboard/UploadVideosCard";
import {ChannelDashboardCard} from "../../../../components/dashboard/ChannelDashboardCard";
import {TopWatchedVideo} from "../../../../components/dashboard/TopWatchedVideo";
import {ViewAnalytic} from "../../../../components/dashboard/ViewAnalytic";

export const ContentAnalytic = (props) => {
    return (
        <div className={'grid grid-cols-4'}>
            <div className={'col-span-2 p-4 mt-2'}>
                <ViewAnalytic/>
            </div>
            <div className={'col-span-2 p-4 mt-2'}>
                <ViewAnalytic/>
            </div>


        </div>
    )
}