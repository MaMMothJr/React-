import React, {useState, useEffect, useCallback} from 'react';
import TodoList from '../TodoList/TodoList';

function Main () {

  const [tasks, setTasks] = useState([]);
  const [newValueTodo, setNewValueTodo] = useState('');

  useEffect(() => {
    fetch('http://localhost:3004/main')
      .then(response => response.json())
      .then(text =>  setTasks(text))
    },[newValueTodo]);

  const onInputChange = useCallback((event) => {
    setNewValueTodo(event.target.value);
  }, []);

  const addToTodo = useCallback((event) => {
    event.preventDefault();
    if(newValueTodo.trim() !== '') {
      fetch('http://localhost:3004/main', {
        body: JSON.stringify({
          isDone: false,
          title: newValueTodo,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
      });
      setNewValueTodo('');}
   }, [newValueTodo]);

  return (
    <div>
      <form className="input-area" onSubmit={addToTodo}>
        <input
          placeholder="What shall i do today?"
          type="text"
          onChange={onInputChange}
          value={newValueTodo} />
        <button type="submit">+</button>
      </form>
      <div className="h2-main">
          <h2>Task</h2> <h2>Actions</h2>
      </div>
      <TodoList tasks={tasks} />
    </div>
  );
}

  export default Main;
