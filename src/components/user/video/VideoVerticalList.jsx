import {VideoMini} from "../../common/video/VideoMini";

export default function VideoVerticalList(props) {
    const {videos} = props;
    return (
        <div>
            { videos &&
                videos.map(video => {
                    return <VideoMini className={'bg-gray-100'} data={video}/>
                })
            }
        </div>
    )
}