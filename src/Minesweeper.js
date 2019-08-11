import React, {Component} from 'react';
import Board from './minesweeper/Board';
import ControlPanel from './minesweeper/ControlPanel';

class Minesweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameRunning: false
    };
    this.handleGameRunning = this.handleGameRunning.bind(this);
  }

  handleGameRunning(status) {
    this.setState({gameRunning: status});
  }

  render() {
    return (
      <div className='row'>
        <div className='col-8'>
          <Board size={10} mine={12} handleGameRunning={this.handleGameRunning}/>
        </div>
        <div className='col-4'>
          <ControlPanel gameRunning={this.state.gameRunning}/>
        </div>
      </div>
    );
  }
}

export default Minesweeper;
