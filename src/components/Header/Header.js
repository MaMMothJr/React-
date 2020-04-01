import React from 'react';
import { Link} from 'react-router-dom';



function Header() {
  return (
    <div>
      <header>
        <h1> <span className="h1st"> React </span> Todo list</h1>
        <h2> Click on task to toggle complete</h2>
        <ul className="navig">
          <li><Link to='/main'>All</Link></li>
          <li><Link to='/isDone'>Rdy</Link></li>
          <li><Link to='/deleted'>Deleted</Link></li>
          <li><Link to='/notDone'>Need todo</Link></li>
        </ul>

    </header>
  </div>
);
}

export default Header;
