import React from 'react';
import TodoListItem  from '../TodoListItem/TodoListItem';
import Main from '../Main/Main';

function TodoList ({tasks}) {
  return (
    <ul>
      {tasks.map(item => <TodoListItem key={item.id} tasks={tasks}/>)}
    </ul>
  );
}

export default TodoList;
