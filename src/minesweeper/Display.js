import React from 'react';
import FlagGrayIcon from './icons/flag-gray.ico';

function Display(props) {
  return (
    <div>
      <div className='flag-counter'>
        <img src={FlagGrayIcon} alt='Flag: '/>
        <span>{props.flagCount}/{props.totalMine}</span>
      </div>
    </div>
  );
}

export default Display;
