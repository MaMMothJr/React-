import React, {useState, useEffect} from 'react';
import TodoList from '../TodoList/TodoList';

function Main () {

  const [tasks, setTasks] = useState([]);
  const [newValueTodo, setNewValueTodo] = useState('');
  const [newTodo, setNewTodo] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3004/posts')
      .then(response => response.json())
      .then(text =>  setTasks(text))
    },[newValueTodo])

  const addToTodo = (event) => {
    if (event.key === 'Enter')  {
        setNewTodo(
          fetch('http://localhost:3004/posts', {
            method:'POST',
            body: JSON.stringify({title: newTodo}),
            }
          )
        )
    }
    console.log('wrong key');
  }

  return (
    <div>
      <div className="input-area">
        <input
          placeholder="What shall i do today?"
          type="text"
          onChange={(event) => setNewValueTodo(event.target.value)}
          onKeyPress={addToTodo} />
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
