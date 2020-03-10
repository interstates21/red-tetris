import React, { useState } from "react";
import classes from "./classes.module.css";
import MyInput from "../../components/MyInput";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const randomName = () => {
  const p1 = [
    "London",
    "Elephant",
    "Blue",
    "Yellow",
    "Grass",
    "Perfect",
    "Illusion",
    "Water",
    "Flower",
    "Speed",
    "Absolute",
    "Reality",
    "Effect",
    "Black",
    "Red"
  ];
  const p2 = [
    "Room",
    "Ghost",
    "Neutron",
    "Sand",
    "Ocean",
    "Air",
    "Television",
    "Theory",
    "Winter",
    "Spring",
    "Information",
    "Garbage",
    "Sword",
    "Pinguin",
    "Sadness"
  ];
  const p3 = [
    "X",
    "Y",
    "F",
    "Gamma",
    "Alpha",
    "Beta",
    "Touch",
    "Spray",
    "Bubble",
    "Circle",
    "Point",
    "Particle",
    "Rain",
    "Train",
    "Plane",
    "Warrior",
    "Dragon",
    'Chicken',
    'Cat',
    'Delta',
  ];

  return (
    p1[getRandomInt(p1.length)] +
    p2[getRandomInt(p2.length)] +
    p3[getRandomInt(p3.length)]
  );
};

const Lobby = ({ onCreateRoom, onJoinRoom, rooms }) => {
  const [name, setName] = useState(randomName());
  const nameReg = /^[a-zA-Z0-9]+$/;
  const enterRoom = roomID => {
    window.location.replace(`/#${roomID}[${name}]`);
    onJoinRoom({ name, roomID });
  };

  return (
    <div className={classes.container}>
      <MyInput value={name} onChangeText={setName} name={"Username"} />
      {nameReg.test(name) ? (
        <div className={classes.box}>
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
          <div
            className={classes.buttonNew}
            onClick={() => onCreateRoom({ name })}
          >
            NEW ROOM
          </div>
        </div>
      ) : (
        <div className="center full-size">
          <h2 className="message">Please, choose a name </h2>
        </div>
      )}
    </div>
  );
};

export default Lobby;
