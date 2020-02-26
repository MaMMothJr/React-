import React from 'react';
import TodoList from '../TodoList/TodoList';


function Main () {
  return (
    <div>
      <div className="input-area">
        <input placeholder="What shall i do today?"></input>
        <button>+</button>
      </div>
      <div className="h2-main">
          <h2>Task</h2> <h2> Actions </h2>
      </div>
      <TodoList />
    </div>
  );
}

export default Main;
