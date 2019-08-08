import React from 'react';
import {Link, Route} from "react-router-dom";
import Minesweeper from "./Minesweeper";

function Games({match}){
  return (
    <div className='row'>
      <div className='col-3'>
        <h2>Games</h2>
        <ul>
          <li>
            <Link to={`${match.url}/minesweeper`}>Minesweeper</Link>
          </li>
        </ul>
      </div>
      <div className='col-9'>
        <Route path={`${match.path}/minesweeper`} exact component={Minesweeper}/>
      </div>
    </div>
  );
}

export default Games;
