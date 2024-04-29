import io from "socket.io-client";
const baseServerUrl = `${process.env.BASE_SERVER}`;

const socket = io(`${baseServerUrl}`);

export default socket;