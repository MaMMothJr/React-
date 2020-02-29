import React, {useState, useEffect} from 'react';
import TodoList from '../TodoList/TodoList';

function Main () {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3004/posts')
      .then(response => response.json())
      .then(text =>  setTasks(text))
    },[])

  console.log(tasks); //проверка

  return (
    <div>
      <div className="input-area">
        <input placeholder="What shall i do today?" />
        <button>+</button>
      </div>
      <div className="h2-main">
          <h2>Task</h2> <h2>Actions</h2>
      </div>
      <TodoList tasks={tasks} />
    </div>
  );
}

export default Main;
