import React from "react";
import ClientGameManager from "./containers/ClientGameManager";
import useHashParams from "./hooks/useHashParams";

const App = () => {
  const hashParams = useHashParams();

  return (
    <div className="app">
      <ClientGameManager hashParams={hashParams} />
    </div>
  );
};

export default App;
