import React from 'react'
import Cell from '../Cell'
import {BoardContainer} from './styles'

const Board = ({image}) => {
    return (<BoardContainer>
        {image.map(n => (
          <Cell n={n} />
        ))}
        </BoardContainer>
    )
}

export default Board;