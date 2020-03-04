import React, {useState, useEffect, useCallback} from 'react';
import TodoList from '../TodoList/TodoList';

function Main () {

  const [tasks, setTasks] = useState([]);
  const [newValueTodo, setNewValueTodo] = useState('');

  useEffect(() => {
    fetch('http://localhost:3004/posts')
      .then(response => response.json())
      .then(text =>  setTasks(text))
    },[newValueTodo])

  const onInputChange = useCallback((event) => {
    setNewValueTodo(event.target.value);
  }, []);

  const addToTodo = useCallback((event) => {
    if (event.key === 'Enter')  {
      fetch('http://localhost:3004/posts', {
        body: JSON.stringify({
          author: 'It`s me',
          title: newValueTodo,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
      });
      setNewValueTodo('');
    }
  }, [newValueTodo]);

  return (
    <div>
      <div className="input-area">
        <input
          placeholder="What shall i do today?"
          type="text"
          onChange={onInputChange}
          onKeyPress={addToTodo}
          value={newValueTodo} />
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
