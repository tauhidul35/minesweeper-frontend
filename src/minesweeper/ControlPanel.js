import React from 'react';

function ControlPanel(props) {
  let button;
  if(props.gameEnded) {
    button = <button onClick={props.startNewGame}>New Game</button>;
  }
  else if(props.gameStarted) {
    button = <><button onClick={props.startNewGame}>Restart</button><button>Pause</button></>;
  }

  return (
    <div className='control-panel'>
      {button}
    </div>
  );
}

export default ControlPanel;
