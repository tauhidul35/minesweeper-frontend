import React from 'react';
import FlagGrayIcon from './icons/flag-gray.ico';
import ClockIcon from './icons/clock.ico';

const toTimeString = (number) => {
  let minute = Math.floor(number / 60);
  let second = number % 60;
  second = second > 9 ? second : '0' + second;

  return `${minute}:${second}`;
};

function Display(props) {
  return (
    <div>
      <div className='flag-counter'>
        <img src={FlagGrayIcon} alt='Flag: '/>
        <span>{props.flagCount}/{props.totalMine}</span>
      </div>
      <div className='time-counter'>
        <img src={ClockIcon} alt='Time: '/>
        <span>{toTimeString(props.timeCount)}</span>
      </div>
    </div>
  );
}

export default Display;
