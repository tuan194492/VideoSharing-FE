import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {subscribeService} from "../../../api/user/subscribe";
import {successMessage} from "../../../assets/message/success_message/success_message";
import {toast} from "react-toastify";

export const SubscribeButton = (props) => {
    const authContext = useContext(AuthContext);
    const channelId = props.channelId;
    const token = authContext.token;

    const [subscribed, setSubscribed] = useState();

    const initState = async () => {
        const result = await subscribeService.isSubscribed(channelId, authContext.user?.id);
        setSubscribed(result.success ? result.isSubscribed : false);
    }

    useEffect(() => {
        initState();
    }, []);
    const handleSubscribe = async () => {
        if (subscribed) {
            const result = await subscribeService.subscribeChannel(token, channelId);
            if (result.success) {
                return toast.success(successMessage.SUBSCRIBE_SUCCESSFUL)
            } else {
                return toast.error(result.message);
            }
        } else {
            const result = await subscribeService.subscribeChannel(token, channelId);
            if (result.success) {
                return toast.success(successMessage.UNDO_SUBSCRIBE_SUCCESSFUL)
            } else {
                return toast.error(result.message);
            }
        }


    }


    return (
        <button
            onClick={handleSubscribe}
            className={props.className}>
            {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
    )
}