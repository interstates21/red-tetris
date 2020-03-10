import React, { useState } from "react";
import classes from "./classes.module.css";
import MyInput from "../../components/MyInput";

const Lobby = ({ onCreateRoom, rooms }) => {
  const [name, setName] = useState("");
  const nameReg = /^[a-zA-Z0-9]+$/;
  const enterRoom = roomID => {
    window.location.replace(`/#${roomID}[${name}]`);
  };

  return (
    <div className={classes.container}>
      <MyInput value={name} onChangeText={setName} name={"Username"} />
      {nameReg.test(name) && (
        <div className={classes.box}>
          <div className={classes.rooms}>
            {Object.keys(rooms).map(e => (
              <h4 className={classes.room} key={e} onClick={() => enterRoom(e)}>
                Room {e}
              </h4>
            ))}
          </div>
          <div
            className={classes.buttonNew}
            onClick={() => onCreateRoom({ name })}
          >
            NEW ROOM
          </div>
        </div>
      )}
    </div>
  );
};

export default Lobby;
