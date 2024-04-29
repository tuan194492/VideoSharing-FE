import io from "socket.io-client";
const baseServerUrl = `${process.env.BASE_SERVER}`;

const socket = io("http://localhost:2999");

socket.connect();
export default socket;