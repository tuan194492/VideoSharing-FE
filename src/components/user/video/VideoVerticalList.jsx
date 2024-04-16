import {VideoMini} from "../../common/video/VideoMini";

export default function VideoVerticalList(props) {
    const {videos} = props;
    return (
        <div className={'p-2'}>
            { videos &&
                videos.map(video => {
                    return <VideoMini className={'bg-gray-100 p-0.5 mb-3'} data={video}/>
                })
            }
        </div>
    )
}