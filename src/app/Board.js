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

  for(let i = 0; i < boardSize; i++) {
    for(let j = 0; j < boardSize; j++) {
      if(board[i][j] === -1) {
        continue;
      }

      let adjacent = [board[i][j-1], board[i][j+1]];

      if(i > 0) {
        adjacent.push(...[board[i-1][j-1], board[i-1][j], board[i-1][j+1]]);
      }

      if(i < boardSize -1) {
        adjacent.push(...[board[i+1][j-1], board[i+1][j], board[i+1][j+1]]);
      }

      board[i][j] = adjacent.filter(x => x === -1).length
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

  openBox(row, col, openMine = true) {
    let myBoard = this.state.myBoard;

    if(myBoard[row][col] === BOX_VALUE['open'] || myBoard[row][col] === BOX_VALUE['flagged']) {
      return false;
    }

    if(this.realBoard[row][col] !== -1 || openMine) {
      myBoard[row][col] = BOX_VALUE['open'];
      this.setState({myBoard: myBoard});
    }

    if(this.realBoard[row][col] === -1 && openMine) {
      this.setState({
        gameEnded: true,
        success: false
      });
    }
    else if(this.realBoard[row][col] === 0) {
      this.openAdjacentBoxes(row, col);
    }
  }

  openAdjacentBoxes(row, col) {
    const myBoard = this.state.myBoard;
    const maxIndex = myBoard.length - 1;
    let openMine = false;

    // check if all flag is added
    if(this.realBoard[row][col] !== 0) {
      let numberOfFlags = [myBoard[row][col - 1], myBoard[row][col + 1]].filter(value => value === BOX_VALUE['flagged']).length;

      if (row > 0) {
        numberOfFlags += [myBoard[row - 1][col - 1], myBoard[row - 1][col], myBoard[row - 1][col + 1]].filter(value => value === BOX_VALUE['flagged']).length;
      }

      if (row < maxIndex) {
        numberOfFlags += [myBoard[row + 1][col - 1], myBoard[row + 1][col], myBoard[row + 1][col + 1]].filter(value => value === BOX_VALUE['flagged']).length;
      }

      if (numberOfFlags !== this.realBoard[row][col]) {
        return false;
      }
      openMine = true;
    }

    // open all adjacent boxes
    if(row > 0 && col > 0) { this.openBox(row-1, col-1, openMine); }
    if(row > 0) { this.openBox(row-1, col, openMine); }
    if(row > 0 && col < maxIndex) { this.openBox(row-1, col+1, openMine); }
    if(col > 0) { this.openBox(row, col-1, openMine); }
    if(col < maxIndex) { this.openBox(row, col+1, openMine); }
    if(row < maxIndex && col > 0) { this.openBox(row+1, col-1, openMine); }
    if(row < maxIndex) { this.openBox(row+1, col, openMine); }
    if(row < maxIndex && col < maxIndex) { this.openBox(row+1, col, openMine); }
  }

  handleBoxLeftClick(row, col) {
    if(this.state.myBoard[row][col] === BOX_VALUE['open']) {
      this.openAdjacentBoxes(row, col);
    }
    else {
      this.openBox(row, col, true);
    }
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
      this.openAdjacentBoxes(row, col);
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
