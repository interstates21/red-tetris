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
  const [rooms, setRooms] = useState({});
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

  const eventListener = () => {
    if (!socket) {
      return;
    }
    socket.on(eventTypes.CREATE_ROOM_SUCCESS, data => {
      console.log("rooms = ", data);
      setRooms(data.rooms);
    });
  };

  useEffect(() => {
    eventListener();
  }, [socket]);

  const createRoom = ({ name }) => {
    if (!socket) return;
    console.log("socket = ", socket);
    socket.emit(eventTypes.CREATE_ROOM, { name });
  };

  const joinRoom = ({ name, roomID }) => {
    if (!socket) return;
    console.log("socket = ", socket);
    socket.emit(eventTypes.CREATE_ROOM, { name });
  };

  useEffect(() => {
    if (!socket) return;
    if (isMovement(keyPressed)) {
      console.log("keyPressed = ", keyPressed);
      socket.emit(eventTypes.MOVEMENT, { key: keyPressed });
    }
  }, [keyPressed, socket]);

  if (!hashParams) {
    return <Lobby onCreateRoom={createRoom} rooms={rooms} />;
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
