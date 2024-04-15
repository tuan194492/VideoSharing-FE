import {IMAGES} from "../../../utils/images/images";

export const VideoMini = (props) => {
    return (
        <div className={'p-1 ' + props.className}>
            <img src={'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'} />
            <div className={'grid grid-cols-12'}>
                <div className={'col col-span-1 mt-2'}>
                    <img src={IMAGES.icon.avatar} />
                </div>
                <div className={"col col-span-11 p-1 flex flex-col justify-between"}>
                    <div className={"title font-bold text-sm line-clamp-2"}>
                        (Full Match) Bomman Hack Não Khiến Em Breach Chạy Lòng Vòng line-clamp-2                         (Full Match) Bomman Hack Não Khiến Em Breach Chạy Lòng Vòng line-clamp-2
                        (Full Match) Bomman Hack Não Khiến Em Breach Chạy Lòng Vòng line-clamp-2
                        (Full Match) Bomman Hack Não Khiến Em Breach Chạy Lòng Vòng line-clamp-2

                    </div>
                    <div className={"channel-name text-gray-700 text-sm mb-3"}>
                        <div>
                            Bomman
                        </div>
                        <div className={"detail"}>
                        <span className={"view-count"}>
                            2.9K views
                        </span>
                            <span className={"posted-date ml-4"}>
                            8 hours ago
                        </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}