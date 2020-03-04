import React, {useState, useEffect} from "react";
import defaultPattern from '../../config/defaultPattern'
import useKey from '../../hooks/useKey'
import useSocket from '../../hooks/useSocket'
import Board from '../../components/Board'
import classes from './classes.module.css'

const Panel = ({room, player}) => {
  return (<div><h4>{room}</h4> <h4>{player}</h4></div>)
}

const GameManager = ({hashParams}) => {
  const [pattern, setPattern] = useState(defaultPattern);
  const [keyPressed] = useKey();
  const [socket] = useSocket();
  const [player, setPlayer] = useState(hashParams.name);
  const [room, setRoom] = useState(hashParams.room);

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
    <div className={classes.game}>
      <Panel room={room} player={player} />
      <Board image={image} />
    </div>
  );
};

export default GameManager;
