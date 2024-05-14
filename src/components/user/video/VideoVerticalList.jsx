import {VideoMini} from "../../common/video/VideoMini";

export default function VideoVerticalList(props) {
    const {videos} = props;
    return (
        <div className={'p-2 overflow-y-visible w-full ' + props.className}>
            { videos &&
                videos.map(video => {
                    if (video.id === props.currentVideoId) {
                        return <VideoMini className={'p-0.5 mb-3 bg-red-300 hover:bg-gray-100 w-[100%]'} data={video}/>
                    }
                    return <VideoMini className={'hover:bg-gray-100 focus:bg-gray-300 p-0.5 mb-3 w-[100%]'} data={video}/>
                })
            }
        </div>
    )
}