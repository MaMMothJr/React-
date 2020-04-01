import React, {useEffect, useState} from 'react';
import TodoListItem  from '../TodoListItem/TodoListItem';
import PropTypes from 'prop-types';

function NotDone () {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3004/notDone')
            .then(response => response.json())
            .then(text =>  setTasks(text))
    },[]);

    return (
        <ul>
            {tasks.map(item => <TodoListItem key={item.id} item={item} />)}
        </ul>
    );
}

export default NotDone;

TodoListItem.propTypes = {
    tasks: PropTypes.array.isRequired
};