import ReactPlayer from 'react-player'
export default function ImageWatcher(props) {
    const {image} = props;

    if (image) {
        const videoSrc = URL.createObjectURL(image);
        return (
            <div className={'flex justify-center ' + props.className}>
                <img src={videoSrc} alt={'Yes image'} />
            </div>
        )
    } else {
        return (
            <div className={'flex justify-center' + props.className}>
                <img src={''} alt={'No image'}/>
            </div>
        )
    }

}