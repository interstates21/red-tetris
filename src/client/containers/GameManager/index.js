import React, { useState, useEffect } from "react";
import { defaultPattern } from "../../config/defaultPattern";
import useKey from "../../hooks/useKey";
import useSocket from "../../hooks/useSocket";
import Board from "../../components/Board";
import classes from "./classes.module.css";
import eventTypes from "../../../config/socketEvents";
import { emmit } from "../../helpers/emmiters";
import Lobby from "../Lobby";
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { useInterval } from "../../hooks/useInterval";
import { useGameStatus } from "../../hooks/useGameStatus";
import { checkCollision } from "../../config/tetrominoes";
import StartButton from "../../components/StartButton";
import styled from "styled-components";

const Panel = ({ room, player }) => {
  return (
    <div>
      <h4>{room}</h4> <h4>{player}</h4>
    </div>
  );
};

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;

const GameManager = ({ hashParams }) => {
  // const [pattern, setPattern] = useState(defaultPattern());
  // const [keyPressed] = useKey();
  const [socket] = useSocket();
  // const [player, setPlayer] = useState(hashParams.name);
  // const [room, setRoom] = useState(hashParams.room);

  // const image = pattern.flat();

  // const isMovement = e => {
  //   return (
  //     e === "ArrowLeft" ||
  //     e === "ArrowRight" ||
  //     e === "ArrowUp" ||
  //     e === "ArrowDown"
  //   );
  // };

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on(eventTypes.CONNECTION, () => {
  //     console.log("hello");
  //   });
  //   //socket.on(eventTypes.TIME, data => setPattern(data.pattern));
  //   // newTetromino

  //   socket.on(eventTypes.TIME, data => setPattern(data.pattern));
  // }, [socket]);

  // useEffect(() => {
  //   if (!socket) return;
  //   if (isMovement(keyPressed)) {
  //     console.log("keyPressed = ", keyPressed);
  //     socket.emit(eventTypes.MOVEMENT, { key: keyPressed });
  //     // emmit(socket, room, MOVEMENT, { key: keyPressed });
  //   }
  // }, [keyPressed]);

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log("re-render");

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    console.log("sdfsdfsdfsdfsfsdfsdf");
    setStage(defaultPattern());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  const createRoom = () => {
    if (!socket) return;
    console.log("socket = ", socket);
    socket.emit(eventTypes.CREATE_ROOM, "room1");
  };

  if (!hashParams) {
    return <Lobby onCreateRoom={createRoom} />;
  }

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <div className={classes.game}>
        <Board stage={stage} />
        <aside>
          <Panel room={hashParams.room} player={hashParams.name} />
          <StartButton callback={startGame} />
        </aside>
      </div>
    </StyledTetrisWrapper>
  );
};

export default GameManager;
