import React, {useState, useEffect} from 'react';
import TodoListItem  from '../TodoListItem/TodoListItem';

function TodoList () {

  const [tasks, setTasks] = useState([]);
  fetch('http://localhost:3004/posts')
    .then(response => response.text())
    .then(text =>  setTasks(text));

    console.log(tasks);

  return (
    <div>
      {tasks.map(item => (
        <TodoListItem key={item.id} title={item.title}/>
      ))}
    </div>
  );
}

export default TodoList;
