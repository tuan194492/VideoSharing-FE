import {VideoMini} from "../../common/video/VideoMini";

export default function VideoVerticalList(props) {
    const {videos} = props;
    return (
        <div className={'p-2 ' + props.className}>
            { videos &&
                videos.map(video => {
                    if (video.id === props.currentVideoId) {
                        return <VideoMini className={'p-0.5 mb-3 bg-red-300'} data={video}/>
                    }
                    return <VideoMini className={'bg-gray-100 p-0.5 mb-3'} data={video}/>
                })
            }
        </div>
    )
}