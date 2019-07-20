import React, {Component} from 'react';

function Box(props) {
  return (
    <div className='board__box'>
      <button>{props.value}</button>
    </div>
  )
}

class Board extends Component {
  constructor(props) {
    super(props);

    this.realValues = [
      [1,  1,  1,  1,  -1],
      [1,  -1,  2,  2,  2],
      [2,  2,  2,  -1,  1],
      [-1,  2,  2,  1,  1],
      [2,  -1,  1,  0,  0]
    ]
  }

  render() {
    let size = this.props.size;
    const board = [];
    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++) {
        board.push(<Box value={this.realValues[i][j]}/>);
      }
      board.push(<div className='clearFix'/>);
    }

    return (
      <div className='board' style={{width: size*50 + 'px'}}>
        {board}
      </div>
    )
  }
}

export default Board;
