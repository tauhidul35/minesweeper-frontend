import React from 'react';

function Paused(props) {
  return (
    <div className='paused-board' style={{width: `${props.size*50+2}px`,  height: `${props.size*50+2}px`}}>
      Paused
    </div>
  );
}

export default Paused;
