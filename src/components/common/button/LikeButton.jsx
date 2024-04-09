import {useState} from "react";

export const LikeButton = (props) => {
    const {handleFunction, likeStatus} = props;
    const [liked, setLiked] = useState(true);
    const likeCount = '10.24K';
    const handleLike = () => {
        setLiked(!liked);
        handleFunction(!liked);
    }
    return (
        <div className={'flex rounded-full bg-gray-300 p-2 text-xs hover:cursor-pointer'} onClick={handleLike}>
            <button className={'w-[25px]'}>
                <svg version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" className="css-ywt53g">
                    <path transform="scale(-1, 1) translate(-1200, 0)"
                          d="m1100 333.33c36.668 0 66.668 30 66.668 66.668v733.33c0 36.668-30 66.668-66.668 66.668h-133.33c-36.668 0-66.668-30-66.668-66.668v-733.33c0-36.668 30-66.668 66.668-66.668zm-604.64-300.63 281.27 377.4c7.332 10.734 11.664 23.734 11.664 37.734v666.66c0 36.801-29.867 66.668-66.664 66.668h-466.67c-29.465 0-55.398-19.332-63.867-47.535l-152.2-581.33c-25.266-85.465 38.734-171.13 127.87-171.13h221.53l-65.598-266.67c-13.867-97.266 106.2-154.2 172.66-81.801z"
                          fill-rule="evenodd"></path>
                </svg>
            </button>
            <span className={'like-count p-1'}>
                {likeCount}
            </span>
        </div>


    )
}