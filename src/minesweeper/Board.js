import React from 'react';
import Box from './Box';

function Board(props) {
  const board = [];
  for(let i = 0; i < props.size; i++) {
    for(let j = 0; j < props.size; j++) {
      board.push(
        <Box
          key={'row'+i+'-col'+j}
          value={props.gameBoard[i][j]}
          userInput={props.userBoard[i][j]}
          position={[i,j]}
          gameEnded={props.gameEnded}
          success={props.success}
          handleLeftClick={props.leftClickOnBox}
          handleRightClick={props.rightClickOnBox}
        />
      );
    }
    board.push(
      <div
        key={'row'+i+'-col'}
        className='clearFix'
      />
    );
  }

  return (
    <div className='board' style={{width: `${props.size*50+2}px`}}>
      {board}
    </div>
  )
}

export default Board;
