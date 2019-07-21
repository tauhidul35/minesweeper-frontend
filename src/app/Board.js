import React, {Component} from 'react';
import Box from './Box'
import BOX_VALUE from './BoxValue';

class Board extends Component {
  constructor(props) {
    super(props);

    this.realValues = [
      [1,  1,  1,  1,  -1],
      [1,  -1,  2,  2,  2],
      [2,  2,  2,  -1,  1],
      [-1,  2,  2,  1,  1],
      [2,  -1,  1,  0,  0]
    ];

    let userInputs = [];
    for (let i = 0; i < props.size; i++) {
      userInputs.push(Array(props.size).fill(BOX_VALUE['hidden']));
    }

    this.state = {
      userInputs: userInputs,
      gameEnded: false,
      success: false
    };

    this.handleBoxLeftClick = this.handleBoxLeftClick.bind(this);
    this.handleBoxRightClick = this.handleBoxRightClick.bind(this);
  }

  handleBoxLeftClick(row, col) {
    if(this.realValues[row][col] === -1) {
      this.setState({
        gameEnded: true,
        success: false
      });
    }
    else if(this.realValues[row][col] === 0) {
      // ToDo: will open all boxes around it
    }

    let userInputs = this.state.userInputs;
    userInputs[row][col] = BOX_VALUE['open'];
    this.setState({userInputs: userInputs});
  }

  handleBoxRightClick(row, col) {
    let userInputs = this.state.userInputs;
    if(userInputs[row][col] === BOX_VALUE['hidden']) {
      userInputs[row][col] = BOX_VALUE['flagged'];
    }
    else if(userInputs[row][col] === BOX_VALUE['flagged']) {
      userInputs[row][col] = BOX_VALUE['marked'];
    }
    else if(userInputs[row][col] === BOX_VALUE['marked']) {
      userInputs[row][col] = BOX_VALUE['hidden'];
    }
    else if(userInputs[row][col] === BOX_VALUE['open']) {
      // ToDo: Will open all boxes around it if safe mode
    }

    this.setState({userInputs: userInputs});
  }

  render() {
    let size = this.props.size;
    const userInputs = this.state.userInputs;
    const board = [];
    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++) {
        board.push(
          <Box
            key={'row'+i+'-col'+j}
            value={this.realValues[i][j]}
            userInput={userInputs[i][j]}
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
