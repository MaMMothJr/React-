import React, {useState, useEffect, useCallback} from 'react';
import Modal from 'react-modal';
import TodoList from '../TodoList/TodoList';
import PropTypes from 'prop-types';
import Main from '../Main/Main';
// import api from '../../services/api';

function TodoListItem({item}) {

  const [newValueTodo, setNewValueTodo] = useState('');
  const [modalIsOpenDelete,setIsOpenDelete] = useState(false);
  const [modalIsOpenEdite,setIsOpenEdite] = useState(false);
  const [taskIsDone,setTaskIsDone] = useState(item.isDone);

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  function openModal(event) {
    event.target.id === "del" ? setIsOpenDelete(true) : setIsOpenEdite(true);
  }

  function closeModal() {
    setIsOpenDelete(false);
    setIsOpenEdite(false);
  }

  function deleteData() {
    fetch(`http://localhost:3004/posts/${item.id}`, {
      method: 'DELETE'
    }).then(response => {
      closeModal();
      console.log('removed');
    }).catch(err => {
      console.error(err)
    });
  }

  const onInputChange = useCallback((event) => {
    setNewValueTodo(event.target.value);
  }, []);

  const editeData = useCallback(() => {
    fetch(`http://localhost:3004/posts/${item.id}`, {
        body: JSON.stringify({
          title: newValueTodo||item.title,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
      });
      setNewValueTodo('');
    }, [item.id, item.title, newValueTodo]);

    const done = useCallback(() => {
      if (item.isDone === false) {
        fetch(`http://localhost:3004/posts/${item.id}`, {
          body: JSON.stringify({
            isDone: true,
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PATCH',
        });
        setTaskIsDone(true);
        } else {
        fetch(`http://localhost:3004/posts/${item.id}`, {
          body: JSON.stringify({
            isDone: false,
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PATCH',
        });
      }
      setTaskIsDone(false);
    }, [taskIsDone]);


  return (
    <li className="listItem">
      <p className={item.isDone? "done": "notDone"}>{item.title}</p>
      <input className="chek" type="checkbox" onChange={done} checked={taskIsDone||item.isDone}/>
      <button className="editeButton" onClick={openModal} id="edt">Edite</button>
        <Modal
          autoFocus={false}
          isOpen={modalIsOpenEdite}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <div>Edite mode</div>
            <form >
              <input
                autoFocus={true}
                value={newValueTodo||item.title}
                type="text"
                onChange={onInputChange}
              />
            <button onClick={editeData} id="save">Save</button>
            <button onClick={closeModal}>Cancel</button>
            <div className="isDone">
             </div>
            </form>
        </Modal>
      <button className="deleteButton" onClick={openModal} id="del">&#10008;</button>
        <Modal
          isOpen={modalIsOpenDelete}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            D E L E T E <br/>
            Are u sure?
          </div>
            <form>
              <button onClick={deleteData}>Yes</button>
              <button onClick={closeModal}>No</button>
            </form>
        </Modal>
    </li>
  );
}

export default TodoListItem;

TodoListItem.propTypes = {
  item: PropTypes.object.isRequired
};
