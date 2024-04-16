import ReactPlayer from 'react-player'
export default function VideoPreview(props) {
    const {video} = props;
    console.log(video)
    console.log(props)
    if (video) {
        const videoSrc = URL.createObjectURL(video);
        console.log(videoSrc.substring(5))
        return (
            <div className={'flex justify-center'}>
                <video width={props.width || "100%"} height={props.height || "100%"} preload={"auto"} controls={true}>
                    <source src={videoSrc} type={"video/mp4"}/>
                </video>
            </div>
        )
    } else {
        return (
            <div className={'flex justify-center'}>
                <video width={props.width || "100%"} height={props.height || "100%"} preload={"auto"} controls={true}>

                </video>
            </div>
        )
    }

}