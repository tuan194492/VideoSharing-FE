import ReactPlayer from 'react-player'
export default function VideoWatcher(props) {
    const {video} = {props};
    console.log(video)

    const videoSrc = URL.createObjectURL(video);
    console.log(videoSrc)
    return (
        <div>
            <ReactPlayer src={videoSrc}/>
        </div>
    )
}