import React from 'react';

function ControlPanel(props) {
  return (
    <div className='control-panel'>
      <button>{props.gameRunning ? 'Restart' : 'Start'}</button>
    </div>
  );
}

export default ControlPanel;
