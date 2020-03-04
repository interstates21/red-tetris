import { useState, useEffect } from "react";

const useHashParams = () => {
  const [Params, setParams] = useState(null);

  const listenToPopstate = () => {
    console.log("location = ", window.location);
    const hashReg = /#[0-9]+\[[a-zA-Z0-9]+\]/g;
    const { pathname, hash } = window.location;
    if (pathname !== "/") {
      setParams(null);
      return;
    }
    setParams(hash.match(hashReg));
    if (!hash.match(hashReg)) {
      setParams(null);
    } else {
      const room = hash.match(/[0-9]+/)[0];
      const name = hash.match(/\[[a-zA-Z0-9]+/)[0].substring(1);
      setParams({
        room,
        name
      });
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);

  return Params;
};

export default useHashParams;
