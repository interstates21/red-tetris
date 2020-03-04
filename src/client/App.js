import React from "react";
import GameManager from "./containers/GameManager";
import useHashRoute from "./hooks/useHashRoute";
import Lobby from './containers/Lobby'


const App = () => {
  const hashRoute = useHashRoute(); 

  return (
    <div className="app">
    {
      hashRoute ? <GameManager hashRoute={hashRoute}/> : <Lobby />
    }
    </div>
  );
};

export default App;
