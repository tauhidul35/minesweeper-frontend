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
      userInputs: userInputs
    };

    this.handleBoxLeftClick = this.handleBoxLeftClick.bind(this);
    this.handleBoxRightClick = this.handleBoxRightClick.bind(this);
  }

  handleBoxLeftClick(row, col) {
    let userInputs = this.state.userInputs;
    userInputs[row][col] = BOX_VALUE['open'];
    this.setState({userInputs: userInputs});
  }

  handleBoxRightClick(row, col) {
    let userInputs = this.state.userInputs;
    userInputs[row][col] = BOX_VALUE['flagged'];
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
            row={i}
            col={j}
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
        {console.log(this.state.userInputs)}
      </div>
    )
  }
}

export default Board;
