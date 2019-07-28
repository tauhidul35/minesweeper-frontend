import React from 'react';
import {Link, Route} from "react-router-dom";
import Minesweeper from "./Minesweeper";

function Games({match}){
  return (
    <div>
      <h2>Games</h2>

      <ul>
        <li>
          <Link to={`${match.url}/minesweeper`}>Minesweeper</Link>
        </li>
      </ul>

      <Route path={`${match.path}/minesweeper`} exact component={Minesweeper}/>
    </div>
  );
}

export default Games;
