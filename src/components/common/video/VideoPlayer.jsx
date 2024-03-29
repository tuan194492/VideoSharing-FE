import ReactPlayer from 'react-player'
export default function VideoPlayer(props) {
    const {video} = props;
    console.log(video)
    console.log(props)
    if (video) {
        const videoSrc = URL.createObjectURL(video);
        console.log(videoSrc.substring(5))
        return (
            <div>
                <video width={"100%"} height={"100%"} preload={"auto"} controls={true}>
                    <source src={videoSrc} type={"video/mp4"}/>
                </video>
            </div>
        )
    } else {
        return (
            <div>
                Please load the page again.
                <video width={"100%"} height={"100%"} preload={"auto"} controls={true}>

                </video>
            </div>
        )
    }

}