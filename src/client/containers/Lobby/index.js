import React, { useState } from "react";
import classes from "./classes.module.css";
import MyInput from "../../components/MyInput";

const rooms = [
  {
    id: 1
  },
  {
    id: 34
  },
  {
    id: 52
  },
  {
    id: 85
  }
];
const Lobby = () => {
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
          <div className={classes.buttonNew}>Create Room</div>
          <div className={classes.rooms}>
            {rooms.map(e => (
              <h4
                className={classes.room}
                key={e.id}
                onClick={() => enterRoom(e.id)}
              >
                Room {e.id}{" "}
              </h4>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lobby;
