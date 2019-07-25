import React, {Component} from 'react';
import BOX_VALUE from './BoxValue';
import FlagGrayIcon from './icons/flag-gray.ico';
import FlagRedIcon from './icons/flag-red.ico';
import MarkedIcon from './icons/marked.ico';
import MineGrayIcon from './icons/mine-gray.ico';
import MineRedIcon from './icons/mine-red.ico';
import TileIcon from './icons/tile.ico';

class Box extends Component {
  constructor(props) {
    super(props);

    this.row = props.position[0];
    this.col = props.position[1];
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }

  handleLeftClick(event) {
    if(!this.props.gameEnded) {
      this.props.handleLeftClick(this.row, this.col);
    }
    event.preventDefault();
  }

  handleRightClick(event) {
    if(!this.props.gameEnded) {
      this.props.handleRightClick(this.row, this.col);
    }
    event.preventDefault();
  }

  render() {
    let value = '';

    if(this.props.userInput === BOX_VALUE['open']) {
      if(this.props.value === -1) {
        value =
          <div>
            <img src={MineRedIcon} alt='Mine'/>
          </div>
      }
      else if(this.props.value === 0) {
        value = <div> </div>;
      }
      else {
        value =
          <div onClick={this.handleLeftClick}>
            {this.props.value}
          </div>;
      }
    }
    else if(this.props.userInput === BOX_VALUE['hidden']) {
      if(this.props.gameEnded && this.props.value === -1) {
        value =
          <div>
            <img src={MineGrayIcon} alt='Mine'/>
          </div>
      }
      else {
        value = <div style={{backgroundImage: `url(${TileIcon})`}} onClick={this.handleLeftClick}/>
      }
    }
    else if(this.props.userInput === BOX_VALUE['flagged']) {
      if(this.props.gameEnded && this.props.value !== -1) {
        value =
          <div style={{backgroundImage: `url(${TileIcon})`}}>
            <img src={FlagRedIcon} alt='Mine'/>
          </div>
      }
      else {
        value =
          <div style={{backgroundImage: `url(${TileIcon})`}}>
            <img src={FlagGrayIcon} alt='Mine'/>
          </div>
      }
    }
    else if(this.props.userInput === BOX_VALUE['marked']) {
      if(this.props.gameEnded && this.props.value === -1) {
        value =
          <div>
            <img src={MineGrayIcon} alt='Mine'/>
          </div>
      }
      else {
        value =
          <div style={{backgroundImage: `url(${TileIcon})`}} onClick={this.handleLeftClick}>
            <img src={MarkedIcon} alt='Mine'/>
          </div>
      }
    }

    return (
      <div className={'board__box ' + this.props.userInput} onContextMenu={this.handleRightClick}>
        {value}
      </div>
    )
  }
}

export default Box;
