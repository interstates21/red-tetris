import React from "react";
import GameManager from "./containers/GameManager";
import useHashParams from "./hooks/useHashParams";
import Lobby from "./containers/Lobby";

const App = () => {
  const hashParams = useHashParams();

  return (
    <div className="app">
      <GameManager hashParams={hashParams} />
    </div>
  );
};

export default App;
