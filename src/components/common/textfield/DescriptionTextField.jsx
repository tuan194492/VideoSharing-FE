import {videoService} from "../../../api/user/video";
import {useEffect, useState} from "react";
import {StringUtils} from "../../../utils/string/StringUtils";

export const DescriptionTextField = (props) => {
    const [displayShowMore, setDisplayShowMore] = useState(false);
    const [showAll, setShowAll] = useState(props.showAll);
    const getClassName = () => {
        if (!showAll) {
            return 'line-clamp-' + props.line;
        }
    }
    useEffect(() => {
        // console.log(props.description);
        const lineCount = Math.max(props.description ? (props.description.match(/\n/g) || []).length : 0, Math.floor(props.description.length / 3 /31));
        // console.log('' + props.description  + lineCount + props.line);
        // console.log(props.line)
        setDisplayShowMore(lineCount > props.line);
    }, [props.description]);
    return (
        <>
            <div className={"break-words whitespace-pre-line " + getClassName()}>
                {props.description}
            </div>
            {displayShowMore &&
            <button className={'mt-2 text-gray-900 font-bold'} onClick={e => setShowAll(!showAll)}>
                {showAll ? 'Hide' : 'Show more'}
            </button>
            }
        </>

    )
}