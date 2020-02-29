import React from 'react';
import TodoList from '../TodoList/TodoList';
import PropTypes from 'prop-types';

function TodoListItem({tasks}) {
  return (
    <li className="listItem">
      <p>{tasks.title} (с) {tasks.author}</p>
      <button className="deleteButton">Delete</button>
      <button className="editeButton">Edite</button>
    </li>
  );
}

export default TodoListItem;

TodoListItem.propTypes = {
  optionalObject: React.PropTypes.object.isRequired
};
