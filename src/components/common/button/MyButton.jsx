import {IMAGES} from "../../../utils/images/images";

export const MyButton = (props) => {
    const {callback, title, icon} = props;
    return (
        <div className={'flex rounded-full bg-gray-300 p-2 text-xs w-[100%] whitespace-nowrap hover:cursor-pointer'} onClick={callback}>
            <button className={'w-[25px]'}>
                {icon}
            </button>
            <span className={'p-1'}>
                {title}
            </span>
        </div>


    )
}