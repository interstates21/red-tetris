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

    socket.on(eventTypes.JOIN_ROOM_SUCCESS, data => {
      console.log("JOIN_ROOM_SUCCESS = ", data);
      setCurrentRoom(data.currentRoom);
      setRooms(data.rooms);
    });

    socket.on(eventTypes.GAME_UPDATE, data => {
      const { rooms, currentRoom: curr } = data;
      console.log(data.message, data);
      if (rooms) {
        setRooms(rooms);
      }
      if (curr !== undefined) {
        setCurrentRoom(curr);
      }
    });

    socket.on(eventTypes.GAME_ERROR, data => {
      const { rooms } = data;
      console.log(data.message, data);
      if (rooms) {
        setRooms(rooms);
      }
      setCurrentRoom(null);
    });

    socket.on(eventTypes.ROOM_UPDATE, data => {
      console.log(data.message, data);
      if (data.rooms) {
        setRooms(data.rooms);
      }
      if (data.currentRoom !== undefined) {
        setCurrentRoom(currentRoom);
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

  const joinRoom = ({ name, room }) => {
    if (!socket) return;
    if (room.started) {
      alert(`The Game in room ${room.id} has already started :()`);
      return;
    }
    // window.location.replace(`/#${room.id}[${name}]`);
    console.log(`Attempt to join room ${room.id}`);
    socket.emit(eventTypes.JOIN_ROOM, { name, roomID: room.id });
  };

  const startGame = () => {
    console.log("Attempt to start the game", currentRoom);
    const roomID = currentRoom.id;
    if (!socket) return;
    socket.emit(eventTypes.START_GAME, { roomID });
  };

  console.log("cuurentRoom", currentRoom);
  if (!currentRoom) {
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
