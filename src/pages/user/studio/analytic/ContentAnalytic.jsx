import {UploadVideosCard} from "../../../../components/dashboard/UploadVideosCard";
import {ChannelDashboardCard} from "../../../../components/dashboard/ChannelDashboardCard";
import {TopWatchedVideo} from "../../../../components/dashboard/TopWatchedVideo";
import {ViewAnalytic} from "../../../../components/dashboard/ViewAnalytic";
import {HlsVideoPlayer} from "../../../../components/common/video/HlsVideoPlayer";
import {NotificationFeed} from "../../../../components/common/notification/NotificationFeed";
import {SubscriberAnalytic} from "../../../../components/dashboard/SubscriberAnalytic";
const notifications = [
    {
        image: 'path_to_image1',
        channelName: 'Vật Vờ Studio',
        title: 'Hệ điều hành không nên thử trên smartphones #shorts',
        time: '41 minutes ago',
        isRead: false
    },
    {
        image: 'path_to_image2',
        channelName: 'Schannel',
        title: 'Schannel - Tạm biệt tháng 5 (Lyric Video)',
        time: '1 hour ago',
        isRead: true
    },
    // Add more notifications as needed
];
export const ContentAnalytic = (props) => {
    return (
        <div className={'grid grid-cols-4'}>
            <div className={'col-span-2 p-4 mt-2'}>
                <ViewAnalytic/>
            </div>
            <div className={'col-span-2 p-4 mt-2'}>
                <SubscriberAnalytic />
            </div>


        </div>
    )
}