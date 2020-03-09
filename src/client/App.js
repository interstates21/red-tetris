import React from "react";
import GameManager from "./containers/GameManager";
import useHashParams from "./hooks/useHashParams";

const App = () => {
  const hashParams = useHashParams();

  return (
    <div className="app">
      <GameManager hashParams={hashParams} />
    </div>
  );
};

export default App;
