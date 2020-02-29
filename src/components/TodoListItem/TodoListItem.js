import React from 'react';
import Main from '../Main/Main';

function TodoListItem({tasks}) {
  return (
    <li className="listItem">
      <p>{tasks.title} (c) {tasks.author}</p>
      <button className="deleteButton">Delete</button>
      <button className="editeButton">Edite</button>
    </li>
  );
}

export default TodoListItem;
