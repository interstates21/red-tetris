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
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [socket] = useSocket();
  const [pattern, setPattern] = useState(getDefaultPattern());

  useEffect(() => {
    eventListener();
  }, [socket]);

  useEffect(() => {
    eventDispatcher();
  }, [keyPressed, socket]);

  const eventListener = () => {
    if (!socket) {
      return;
    }
    socket.on(eventTypes.CREATE_ROOM_SUCCESS, data => {
      console.log("CREATE_ROOM_SUCCESS = ", data);
      setRooms(data.rooms);
    });

    socket.on(eventTypes.JOIN_ROOM_SUCCESS, data => {
      console.log("JOIN_ROOM_SUCCESS = ", data);
      setCurrentRoom(data.currentRoom);
      setRooms(data.rooms);
    });

    socket.on(eventTypes.NOTIFICATION, ({ message, ...rest }) => {
      console.log("NOTIFICATION = ", message);
      if (rest.rooms) {
        setRooms(rooms);
      }
    });
  };

  const eventDispatcher = () => {
    if (!socket) return;

    if (isMovement(keyPressed)) {
      console.log("keyPressed = ", keyPressed);
      socket.emit(eventTypes.MOVEMENT, { key: keyPressed });
    }
  };

  const isMovement = e => {
    return (
      e === "ArrowLeft" ||
      e === "ArrowRight" ||
      e === "ArrowUp" ||
      e === "ArrowDown"
    );
  };

  const createRoom = ({ name }) => {
    if (!socket) return;
    socket.emit(eventTypes.CREATE_ROOM, { name });
  };

  const joinRoom = ({ name, roomID }) => {
    if (!socket) return;
    console.log(`Attempt to join room ${roomID}`);
    socket.emit(eventTypes.JOIN_ROOM, { name, roomID });
  };

  const startGame = () => {};

  if (!hashParams && !currentRoom) {
    return (
      <Lobby onCreateRoom={createRoom} onJoinRoom={joinRoom} rooms={rooms} />
    );
  }

  return (
    <StyledTetrisWrapper role="button" tabIndex="0">
      <div className={classes.game}>
        <Board stage={pattern} />
        <aside>
          <StartButton callback={startGame} />
        </aside>
      </div>
    </StyledTetrisWrapper>
  );
};

export default GameManager;
