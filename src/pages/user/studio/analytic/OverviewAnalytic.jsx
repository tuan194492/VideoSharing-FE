import {ViewAnalytic} from "../../../../components/dashboard/ViewAnalytic";
import {ChannelDashboardCard} from "../../../../components/dashboard/ChannelDashboardCard";
import {UploadVideosCard} from "../../../../components/dashboard/UploadVideosCard";
import {TopWatchedVideo} from "../../../../components/dashboard/TopWatchedVideo";

export const OverviewAnalytic = (props) => {
    return (
        <div className={'grid grid-cols-4'}>
            <div className={'col-span-1 p-4 mt-2'}>
                <UploadVideosCard/>
            </div>
            <div className={'col-span-1 p-4 ml-2'}>
                <ChannelDashboardCard
                    title={'Channel analytics'}
                    subscribers={0}
                    views={100}
                    watchTime={12}
                />
            </div>
            <div className={'col-span-2 p-8 '}>
                <TopWatchedVideo />
            </div>


        </div>
    )
}