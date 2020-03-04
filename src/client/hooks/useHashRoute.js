import {useState, useEffect} from 'react'

const useHashRoute = () => {
    const [hashRoute, setHashRoute] = useState(null);
  

    useEffect(() => {
        console.log("location = ", window.location)
        const hashReg = /#[0-9]+\[[a-zA-Z]+\]/g;
        const {pathname, hash} = window.location;
        setHashRoute(hash.match(hashReg));
        console.log("match", hash.match(hashReg))
        // if (pathname)
        // if (window.location)
    }, [window.location])
  
    return hashRoute
  }
  
  
  export default useHashRoute;