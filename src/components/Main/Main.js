import React from 'react';
import TodoList from '/components/TodoList/TodoList';


function Main () {
  return (
    <div>
      <input> </input>
      <h2>Task</h2> <h2> Actions </h2>
      <TodoList className ="listItem" />
    </div>
  );
}

export default Main;
