import {VideoMini} from "../../../components/common/homepage/VideoMini";

export const UserVideoHomePage = (props) => {

    function getClassNameForVideoMini() {

    }

    return (
        <div className={'grid sm:grid-cols-1 md:grid-cols-4 p-1 gap-1'}>
            <VideoMini className={'col col-span-1'} />
            <VideoMini className={'col col-span-1'} />
            <VideoMini className={'col col-span-1'} />
            <VideoMini className={'col col-span-1'} />
            <VideoMini className={'col col-span-1'} />
            <VideoMini className={'col col-span-1'} />



        </div>
    )
}