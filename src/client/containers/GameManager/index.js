import React, {useState, useEffect} from "react";
import defaultPattern from '../../config/defaultPattern'
import useKey from '../../hooks/useKey'
import useSocket from '../../hooks/useSocket'
import Board from '../../components/Board'

const GameManager = () => {
  const [pattern, setPattern] = useState(defaultPattern);
  const [keyPressed] = useKey();
  const [socket] = useSocket();

  const image = pattern.flat();

  const isMovement = (e) => {
    return (e === 'ArrowLeft' || e === 'ArrowRight' || e === 'ArrowUp' || e === 'ArrowDown')
  }
  useEffect(() => {
    if (!socket) return ;
      socket.on("time", data => setPattern(data.pattern))
  }, [socket])

  useEffect(() => {
    if (!socket) return ;
    if (isMovement(keyPressed)) {
      console.log('keyPressed = ', keyPressed)
      socket.emit('movement', {key: keyPressed});
    }
  }, [keyPressed])

  return (  
      <Board image={image} />
  );
};

export default GameManager;
