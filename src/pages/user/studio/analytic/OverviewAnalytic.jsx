import {ViewAnalytic} from "../../../../components/dashboard/ViewAnalytic";
import {ChannelDashboardCard} from "../../../../components/dashboard/ChannelDashboardCard";
import {UploadVideosCard} from "../../../../components/dashboard/UploadVideosCard";
import {TopWatchedVideo} from "../../../../components/dashboard/TopWatchedVideo";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../../context/AuthContext";
import {channelService} from "../../../../api/user/channel";
import {DateUtils} from "../../../../utils/date/DateUtils";

export const OverviewAnalytic = (props) => {
    const authContext = useContext(AuthContext);
    const user = authContext.user;
    const [channelAnalytic, setChannelAnalytic] = useState();
    const fetchChannelAnalyticData = async (channelId) => {
        const result = await channelService.getChannelAnalytics(channelId);
        console.log(result)
        if (result.success) {
            setChannelAnalytic(result.data.data);
        }
    }

    const initData = async () => {
        await fetchChannelAnalyticData(user.id);
    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <div className={'grid grid-cols-4'}>
            <div className={'col-span-1 p-4 mt-2'}>
                <UploadVideosCard/>
            </div>
            <div className={'col-span-1 p-4 ml-2'}>
                <ChannelDashboardCard
                    title={'Channel analytics'}
                    subscribers={channelAnalytic?.subscriberCount}
                    views={channelAnalytic?.viewCount}
                    watchTime={(channelAnalytic?.totalWatchTime / 60).toFixed(2)}
                />
            </div>
            <div className={'col-span-2 p-8 '}>
                <TopWatchedVideo />
            </div>


        </div>
    )
}