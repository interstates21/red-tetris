import {useEffect, useState} from 'react'
import io from "socket.io-client";

const useSocket = () => {
    const [connection, setConnection] = useState(null);
  useEffect(() => {
    const socket = io(process.env.REACT_APP_GAME_SOCKET_PATH);
    console.log(`connected socket on ${process.env.REACT_APP_GAME_SOCKET_PATH}`);
    setConnection(socket);
  }, [])

  return [connection, setConnection];
}

export default useSocket;