import React, {Component} from 'react';
import Box from './Box'
import BOX_VALUE from './BoxValue';

function createBoard(boardSize, numberOfMines) {
  let board = [];
  for (let i = 0; i < boardSize; i++) {
    board.push(Array(boardSize).fill(0));
  }

  for(let i = 0; i < numberOfMines;) {
    let randRow = Math.floor(Math.random() * boardSize);
    let randCol = Math.floor(Math.random() * boardSize);

    if(board[randRow][randCol] === 0) {
      board[randRow][randCol] = -1;
      i++;
    }
  }

  let i = 0;
  for(let j = 0; j < boardSize; j++) {
    if(board[i][j] !== -1) {
      board[i][j] = [board[i][j-1], board[i][j+1], board[i+1][j-1], board[i+1][j], board[i+1][j+1]].filter(x => x === -1).length
    }
  }

  for(i++; i < boardSize - 1; i++) {
    for(let j = 0; j < boardSize; j++) {
      if(board[i][j] !== -1) {
        board[i][j] = [board[i-1][j-1], board[i-1][j], board[i-1][j+1], board[i][j-1], board[i][j+1],
          board[i+1][j-1], board[i+1][j], board[i+1][j+1]].filter(x => x === -1).length
      }
    }
  }

  for(let j = 0; j < boardSize; j++) {
    if(board[boardSize-1][j] !== -1) {
      board[i][j] = [board[i-1][j-1], board[i-1][j], board[i-1][j+1], board[i][j-1], board[i][j+1]].filter(x => x === -1).length
    }
  }

  return board;
}

class Board extends Component {
  constructor(props) {
    super(props);

    this.realBoard = createBoard(props.size, props.mine);

    let myBoard = [];
    for (let i = 0; i < props.size; i++) {
      myBoard.push(Array(props.size).fill(BOX_VALUE['hidden']));
    }

    this.state = {
      myBoard: myBoard,
      gameEnded: false,
      success: false
    };

    this.handleBoxLeftClick = this.handleBoxLeftClick.bind(this);
    this.handleBoxRightClick = this.handleBoxRightClick.bind(this);
  }

  handleBoxLeftClick(row, col) {
    if(this.realBoard[row][col] === -1) {
      this.setState({
        gameEnded: true,
        success: false
      });
    }
    else if(this.realBoard[row][col] === 0) {
      // ToDo: will open all boxes around it
    }

    let myBoard = this.state.myBoard;
    myBoard[row][col] = BOX_VALUE['open'];
    this.setState({myBoard: myBoard});
  }

  handleBoxRightClick(row, col) {
    let myBoard = this.state.myBoard;
    if(myBoard[row][col] === BOX_VALUE['hidden']) {
      myBoard[row][col] = BOX_VALUE['flagged'];
    }
    else if(myBoard[row][col] === BOX_VALUE['flagged']) {
      myBoard[row][col] = BOX_VALUE['marked'];
    }
    else if(myBoard[row][col] === BOX_VALUE['marked']) {
      myBoard[row][col] = BOX_VALUE['hidden'];
    }
    else if(myBoard[row][col] === BOX_VALUE['open']) {
      // ToDo: Will open all boxes around it if safe mode
    }

    this.setState({myBoard: myBoard});
  }

  render() {
    let size = this.props.size;
    const myBoard = this.state.myBoard;
    const board = [];
    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++) {
        board.push(
          <Box
            key={'row'+i+'-col'+j}
            value={this.realBoard[i][j]}
            userInput={myBoard[i][j]}
            position={[i,j]}
            gameEnded={this.state.gameEnded}
            success={this.state.success}
            handleLeftClick={this.handleBoxLeftClick}
            handleRightClick={this.handleBoxRightClick}
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
      <div className='board' style={{width: size*50 + 'px'}}>
        {board}
      </div>
    )
  }
}

export default Board;
