import React from 'react';
import TodoListItem  from '../TodoListItem/TodoListItem';
import Main from '../Main/Main';
import PropTypes from 'prop-types';

function TodoList ({tasks}) {

  const cb = {
    textDecoration: "line-through" //не работает
  }

  const noCb = {
    textDecoration: "none"
  }

  return (
    <ul>
      {tasks.map(item => <TodoListItem key={item.id} item={item} style={(item) => item.isDone? noCb : cb} />)}
    </ul>
  );
}

export default TodoList;

TodoListItem.propTypes = {
  tasks: PropTypes.array.isRequired
};
