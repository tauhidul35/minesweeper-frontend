import React, {Component} from 'react';

class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.handleClickOnPause = this.handleClickOnPause.bind(this);
    this.handleClickOnResume = this.handleClickOnResume.bind(this);
  }

  handleClickOnPause() {
    this.props.pauseGame(true);
  }

  handleClickOnResume() {
    this.props.pauseGame(false);
  }

  render() {
    let startButton;
    let pauseButton;

    if (this.props.gameEnded) {
      startButton = <button onClick={this.props.startNewGame}>New Game</button>;
      pauseButton = <button disabled='disabled'>Pause</button>;
    } else if (this.props.gameStarted) {
      startButton = <button onClick={this.props.startNewGame}>Restart</button>;

      if (this.props.gamePaused) {
        pauseButton = <button onClick={this.handleClickOnResume}>Resume</button>;
      } else {
        pauseButton = <button onClick={this.handleClickOnPause}>Pause</button>;
      }
    } else {
      startButton = <button disabled='disabled'>Restart</button>;
      pauseButton = <button disabled='disabled'>Pause</button>;
    }

    return (
      <div className='control-panel'>
        {startButton}
        {pauseButton}
      </div>
    );
  }
}

export default ControlPanel;
