import React from 'react';
import TodoList from '../TodoList/TodoList';
import PropTypes from 'prop-types';

function TodoListItem({item}) {
  return (
    <li className="listItem">
      <p>{item.title} (с) {item.author}</p>
      <button className="deleteButton">Delete</button>
      <button className="editeButton">Edite</button>
    </li>
  );
}

export default TodoListItem;

TodoListItem.propTypes = {
  item: PropTypes.object.isRequired
};
