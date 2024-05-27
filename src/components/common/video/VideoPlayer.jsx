import ReactPlayer from 'react-player'
export default function VideoPlayer(props) {
    const {videoStc} = props;
    console.log(videoStc);
    if (videoStc) {
        return (
            <div className={'flex justify-center'}>
                <video width={props.width || "100%"} height={props.height || "100%"} preload={"auto"} controls={true}>
                    <source src={videoStc} type={'video/mp4'}/>
                    <source src={videoStc} type={'video/mp4'}/>
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