import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {subscribeService} from "../../../api/user/subscribe";
import {successMessage} from "../../../assets/message/success_message/success_message";
import {toast} from "react-toastify";

export const SubscribeButton = (props) => {
    const authContext = useContext(AuthContext);
    const channelId = props.channelId;
    const token = authContext.token;

    const [subscribed, setSubscribed] = useState(false);

    const initState = async () => {
        const result = await subscribeService.isSubscribed(token, channelId);
        console.log(result);
        setSubscribed(result.success ? result.isSubscribed : false);
    }


    const handleSubscribe = async () => {
        if (!subscribed) {
            const result = await subscribeService.subscribeChannel(token, channelId);
            if (result.success) {
                setSubscribed(true);
                props.callback(true);
                return toast.success(successMessage.SUBSCRIBE_SUCCESSFUL)

            } else {
                return toast.error(result.message);
            }
        } else {
            const result = await subscribeService.undoSubscribeChannel(token, channelId);
            if (result.success) {
                setSubscribed(false);
                props.callback(false);
                return toast.success(successMessage.UNDO_SUBSCRIBE_SUCCESSFUL)
            } else {
                return toast.error(result.message);
            }
        }


    }

    useEffect(() => {
        initState();
    }, [props.channelId]);

    function getClassNameForButton() {
        if (subscribed) {
            return ' bg-red-500 hover:bg-red-600';
        }
        return ' bg-gray-500 hover:bg-gray-600';
    }

    return (
        <button
            onClick={handleSubscribe}
            className={props.className + getClassNameForButton()}>
            {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
    )
}