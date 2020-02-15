import React,{useState, useEffect} from "react";
import Cell from "../../components/Cell";
import { BoardContainer } from "./styles";
import socketIOClient from "socket.io-client";

const pattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const url = 'http://localhost:5000/api/items';
const Board = () => {
  const [data, setData] = useState('');
  const image = pattern.flat();

  const fetchData = () => {
    fetch(url).
    then(res => res.json())
    .then(data => setData(data.name))
  }
  
  useEffect(() => {
    const socket = socketIOClient('http://localhost:5000');
    socket.on("village", data => 
    
      console.log('data = ', data)
      // setData(data.data)
  
    )
  }, [])

  return (
      <BoardContainer>
        {image.map(n => (
          <Cell n={n} />
        ))}
        <h1 style={{fontSize: 30, color:'yellow'}}>
          {data}
        </h1>
        <button onClick={fetchData}>Click Me</button>
      </BoardContainer>
  );
};

export default Board;
