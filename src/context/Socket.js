import io from "socket.io-client";
import {toast} from "react-toastify";
const baseServerUrl = `${process.env.REACT_APP_BASE_SOCKET_SERVER}`;

const socket = io(baseServerUrl);

socket.on('connect', () => {
    console.log('Connected to the server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});
socket.on('message', (data) => {
    if (data.type === 'comment') {
        toast.success('Some one commented on your videos');
    }
})

export default socket;