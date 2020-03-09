import React, { useState, useEffect } from "react";
import getDefaultPattern from "../../../config/defaultPattern";
import useKey from "../../hooks/useKey";
import useSocket from "../../hooks/useSocket";
import Board from "../../components/Board";
import classes from "./classes.module.css";
import eventTypes from "../../../config/socketEvents";
import Lobby from "../Lobby";
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
  const [keyPressed] = useKey();
  const [socket] = useSocket();
  const [pattern, setPattern] = useState(getDefaultPattern());

  const isMovement = e => {
    return (
      e === "ArrowLeft" ||
      e === "ArrowRight" ||
      e === "ArrowUp" ||
      e === "ArrowDown"
    );
  };

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on(eventTypes.CONNECTION, () => {
  //     console.log("hello");
  //   });
  //   //socket.on(eventTypes.TIME, data => setPattern(data.pattern));
  //   // newTetromino

  //   socket.on(eventTypes.TIME, data => setPattern(data.pattern));
  // }, [socket]);

  const createRoom = () => {
    if (!socket) return;
    console.log("socket = ", socket);
    socket.emit(eventTypes.CREATE_ROOM, "room1");
  };

  useEffect(() => {
    if (!socket) return;
    if (isMovement(keyPressed)) {
      console.log("keyPressed = ", keyPressed);
      socket.emit(eventTypes.MOVEMENT, { key: keyPressed });
    }
  }, [keyPressed, socket]);

  if (!hashParams) {
    return <Lobby onCreateRoom={createRoom} />;
  }

  const startGame = () => {};

  return (
    <StyledTetrisWrapper role="button" tabIndex="0">
      <div className={classes.game}>
        <Board stage={pattern} />
        <aside>
          <Panel room={hashParams.room} player={hashParams.name} />
          <StartButton callback={startGame} />
        </aside>
      </div>
    </StyledTetrisWrapper>
  );
};

export default GameManager;
