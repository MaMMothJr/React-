import React from 'react';
import TodoListItem  from '../TodoListItem/TodoListItem';
import Main from '../Main/Main';
import PropTypes from 'prop-types';

function TodoList ({tasks}) {

  return (
    <ul>
      {tasks.map(item => <TodoListItem key={item.id} item={item} />)}
    </ul>
  );
}

export default TodoList;

TodoListItem.propTypes = {
  tasks: PropTypes.array.isRequired
};
