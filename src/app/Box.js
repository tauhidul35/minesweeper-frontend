import React, {Component} from 'react';
import BOX_VALUE from './BoxValue';
import Flag from './flag-icon.png'

class Box extends Component {
  constructor(props) {
    super(props);

    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }

  handleLeftClick(event) {
    this.props.handleLeftClick(this.props.row, this.props.col);
    event.preventDefault();
  }

  handleRightClick(event) {
    this.props.handleRightClick(this.props.row, this.props.col);
    event.preventDefault();
  }

  render() {
    let value = '';
    if(this.props.userInput === BOX_VALUE['open']) {
      value = this.props.value;
    }
    else if(this.props.userInput === BOX_VALUE['flagged']) {
      value = <img src={Flag} />
    }

    return (
      <div className={'board__box ' + this.props.userInput}>
        <button onClick={this.handleLeftClick} onContextMenu={this.handleRightClick}>{value}</button>
      </div>
    )
  }
}

export default Box;
