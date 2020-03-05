import React, {useState, useEffect, useCallback} from 'react';
import Modal from 'react-modal';
import TodoList from '../TodoList/TodoList';
import PropTypes from 'prop-types';
import Main from '../Main/Main';

function TodoListItem({item}) {

  const [newValueTodo, setNewValueTodo] = useState('');
  const [checkedStatus, setCheckedStatus] = useState({});
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

  let subtitle;

  const [modalIsOpenDelete,setIsOpenDelete] = useState(false);
  const [modalIsOpenEdite,setIsOpenEdite] = useState(false);

  function openModal(event) {
    event.target.id === "del" ? setIsOpenDelete(true) : setIsOpenEdite(true);
  }

  function closeModal(){
    setIsOpenDelete(false);
  }

  function deleteData() {
    fetch('http://localhost:3004/posts' + "/" + item.id, {
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
    fetch('http://localhost:3004/posts' + "/" + item.id, {
        body: JSON.stringify({
          title: newValueTodo,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
      });
      setNewValueTodo('');
    }, [newValueTodo]);

    const done = useCallback(() => {
      const cb = {
        textDecoration: "line-through"
      }
      fetch('http://localhost:3004/posts' + "/" + item.id, {
        body: JSON.stringify({
          isDone: true,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
      });
      setCheckedStatus();
    }, []);

  return (
    <li className="listItem">
      <p style={checkedStatus}>{item.title}</p>
      <button className="deleteButton" onClick={openModal} id="del">Delete</button>
        <Modal
          isOpen={modalIsOpenDelete}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <div>Are u sure?</div>
            <form>
              <button onClick={deleteData}>Yes</button>
              <button onClick={closeModal}>No</button>
              </form>
          </Modal>
      <button className="editeButton" onClick={openModal} id="edt">Edite</button>
        <Modal
          isOpen={modalIsOpenEdite}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <div>Edite mode</div>
            <form onClick={done}>
                <input
                value={newValueTodo||item.title}
                type="text"
                onChange={onInputChange}
              />
            <button className="chek" type="checkbox"></button>
            <button onClick={editeData} id="save">Save</button>
            <button onClick={closeModal}>Cancel</button>
            </form>
          </Modal>
    </li>
  );
}

export default TodoListItem;

TodoListItem.propTypes = {
  item: PropTypes.object.isRequired
};
