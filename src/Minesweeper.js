import React, {Component} from 'react';
import Board from './minesweeper/Board';
import ControlPanel from './minesweeper/ControlPanel';
import BOX_VALUE from "./minesweeper/BoxValue";

const CreateBoard = (boardSize, numberOfMines) => {
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
};

class Minesweeper extends Component {
  constructor(props) {
    super(props);
    
    // Set default value
    const defaultBoardSize = 10;
    const defaultTotalMine = 12;

    // Create empty user board
    let userBoard = [];
    for (let i = 0; i < defaultBoardSize; i++) {
      userBoard.push(Array(defaultBoardSize).fill(BOX_VALUE['hidden']));
    }

    this.state = {
      gameEnded: false,
      success: false,
      boardSize: defaultBoardSize,
      totalMine: defaultTotalMine,
      userBoard: userBoard,
      gameStarted: false
    };

    // Create game board with random mines position
    this.gameBoard = CreateBoard(this.state.boardSize, this.state.totalMine);

    this.leftClickOnBox = this.leftClickOnBox.bind(this);
    this.rightClickOnBox = this.rightClickOnBox.bind(this);
  }

  openBox(row, col, openMine = true) {
    let userBoard = this.state.userBoard;

    if(userBoard[row][col] === BOX_VALUE['open'] || userBoard[row][col] === BOX_VALUE['flagged']) {
      return false;
    }

    if(this.gameBoard[row][col] !== -1 || openMine) {
      userBoard[row][col] = BOX_VALUE['open'];
      this.setState({userBoard: userBoard});
    }

    if(this.gameBoard[row][col] === -1 && openMine) {
      this.setState({
        gameEnded: true,
        success: false
      });
    }
    else if(this.gameBoard[row][col] === 0) {
      this.openAdjacentBoxes(row, col);
    }
  };

  openAdjacentBoxes(row, col) {
    const userBoard = this.state.userBoard;
    const maxIndex = userBoard.length - 1;
    let openMine = false;

    // check if all flag is added
    if(this.gameBoard[row][col] !== 0) {
      let numberOfFlags = [userBoard[row][col - 1], userBoard[row][col + 1]].filter(value => value === BOX_VALUE['flagged']).length;

      if (row > 0) {
        numberOfFlags += [userBoard[row - 1][col - 1], userBoard[row - 1][col], userBoard[row - 1][col + 1]].filter(value => value === BOX_VALUE['flagged']).length;
      }

      if (row < maxIndex) {
        numberOfFlags += [userBoard[row + 1][col - 1], userBoard[row + 1][col], userBoard[row + 1][col + 1]].filter(value => value === BOX_VALUE['flagged']).length;
      }

      if (numberOfFlags !== this.gameBoard[row][col]) {
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
  };

  leftClickOnBox(row, col) {
    this.setState({gameStarted: true});

    if(this.state.userBoard[row][col] === BOX_VALUE['open']) {
      this.openAdjacentBoxes(row, col);
    }
    else {
      this.openBox(row, col, true);
    }
  }

  rightClickOnBox(row, col) {
    this.setState({gameStarted: true});

    let userBoard = this.state.userBoard;
    if(userBoard[row][col] === BOX_VALUE['hidden']) {
      userBoard[row][col] = BOX_VALUE['flagged'];
    }
    else if(userBoard[row][col] === BOX_VALUE['flagged']) {
      userBoard[row][col] = BOX_VALUE['marked'];
    }
    else if(userBoard[row][col] === BOX_VALUE['marked']) {
      userBoard[row][col] = BOX_VALUE['hidden'];
    }
    else if(userBoard[row][col] === BOX_VALUE['open']) {
      this.openAdjacentBoxes(row, col);
    }

    this.setState({userBoard: userBoard});
  }

  render() {
    return (
      <div className='row'>
        <div className='col-8'>
          <Board
            size={this.state.boardSize}
            mine={this.state.totalMine}
            gameBoard={this.gameBoard}
            userBoard={this.state.userBoard}
            gameEnded={this.state.gameEnded}
            success={this.state.success}
            leftClickOnBox={this.leftClickOnBox}
            rightClickOnBox={this.rightClickOnBox}
          />
        </div>
        <div className='col-4'>
          <ControlPanel gameRunning={this.state.gameStarted && !this.state.gameEnded}/>
        </div>
      </div>
    );
  }
}

export default Minesweeper;
