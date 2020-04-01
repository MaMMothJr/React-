import React, {useEffect, useState} from 'react';
import TodoListItem  from '../TodoListItem/TodoListItem';
import PropTypes from 'prop-types';

function Deleted () {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3004/deleted')
            .then(response => response.json())
            .then(text =>  setTasks(text))
    },[]);

    return (
        <ul>
            {tasks.map(item => <TodoListItem key={item.id} item={item} />)}
        </ul>
    );
}

export default Deleted;

TodoListItem.propTypes = {
    tasks: PropTypes.array.isRequired
};