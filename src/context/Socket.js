import io from "socket.io-client";
import {toast} from "react-toastify";
const baseServerUrl = `${process.env.BASE_SERVER}`;

const socket = io("http://localhost:2999");

socket.connect();
socket.on('message', (data) => {
    if (data.type === 'comment') {
        toast.success('Some one commented on your videos');
    }
    // toast.success('Has message from server');
})
export default socket;