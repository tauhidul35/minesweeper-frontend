import React from 'react';
import {Link} from "react-router-dom";

function Header() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to='/'>My Site</Link>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav'
              aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className='nav-item active'>
            <Link to='/' className='nav-link'>Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className='nav-item'>
            <Link to='/about' className='nav-link'>About</Link>
          </li>
          <li className='nav-item dropdown'>
            <Link to='/games' className='nav-link dropdown-toggle'>Games</Link>
            <div className='dropdown-menu'>
              <Link to='/games/minesweeper' className='dropdown-item'>Minesweeper</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
