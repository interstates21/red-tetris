import React from "react";
import GameManager from "./containers/GameManager";
import useHashParams from "./hooks/useHashParams";
import Lobby from './containers/Lobby'


const App = () => {
  const hashParams = useHashParams(); 

  return (
    <div className="app">
    {
      hashParams ? <GameManager hashParams={hashParams}/> : <Lobby />
    }
    </div>
  );
};

export default App;
