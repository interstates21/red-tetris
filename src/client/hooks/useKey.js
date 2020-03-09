import {useState, useEffect} from 'react'

const useKey = () => {
    const [key, setKey] = useState(null);
  
    const handler = (event) => {
      setKey(event.key);
    }
    useEffect(() => {
      window.addEventListener('keydown', handler);
      return () => {
         window.removeEventListener('keydown', handler);
      };
    }, [])
  
    return [key,setKey]
  }
  
  
  export default useKey;