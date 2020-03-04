import React from "react";
import classes from "./classes.module.css";

const MyInput = ({ name, value, onChangeText }) => {
  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        name={name}
        placeholder={name}
        value={value}
        onChange={e => onChangeText(e.target.value)}
      ></input>
    </div>
  );
};

export default MyInput;
