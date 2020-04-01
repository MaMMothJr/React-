import React, {useState, useCallback} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

function TodoListItem({item}) {

  const [newValueTodo, setNewValueTodo] = useState('');
  const [modalIsOpenDelete,setIsOpenDelete] = useState(false);
  const [modalIsOpenEdit,setIsOpenEdit] = useState(false);
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
    event.target.id === "del" ? setIsOpenDelete(true) : setIsOpenEdit(true);
  }

  function closeModal() {
    setIsOpenDelete(false);
    setIsOpenEdit(false);
  }

  function goToDeleted() {
    fetch('http://localhost:3004/deleted/', {
      body: JSON.stringify({
        id: item.id,
        isDone: item.isDone,
        title: item.title,
       }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
    })
  }

  function deleteData() {
    goToDeleted();
    fetch(`http://localhost:3004/main/${item.id}`, {
      method: 'DELETE'
    }).then(response => {
      closeModal();
    }).catch(err => {
      console.error(err)
    });
  }

  const onInputChange = useCallback((event) => {
    setNewValueTodo(event.target.value);
  }, []);

  const editData = useCallback(() => {
    fetch(`http://localhost:3004/main/${item.id}`, {
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



  function delFromToDone() {
    fetch(`http://localhost:3004/isDone/${item.id}`, {
      method: 'DELETE'
    }).catch(err => {
      console.error(err)
    });
  }

  function delFromNotDone() {
    fetch(`http://localhost:3004/notDone/${item.id}`, {
      method: 'DELETE'
    }).catch(err => {
      console.error(err)
    });
  }

  function goToDone(status) {
    if (status === true) {
      delFromNotDone();
      fetch('http://localhost:3004/isDone/', {
        body: JSON.stringify({
          id: item.id,
          isDone: item.isDone,
          title: item.title,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
      })
    } else {
      delFromToDone();
      function goToNotDone(status) {
        fetch('http://localhost:3004/notDone/', {
          body: JSON.stringify({
            id: item.id,
            isDone: item.isDone,
            title: item.title,
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        })
      }
    }
  }
  const done = useCallback(ev => {
    const status = ev.target.checked;
    goToDone(status);
    fetch(`http://localhost:3004/main/${item.id}`, {
      body: JSON.stringify({
      isDone: status,
        }),
       headers: {
            'Content-Type': 'application/json'
          },
          method: 'PATCH',
        })
         .then(() => setTaskIsDone(status));
      }, []);

    return (
    <li className="listItem">
      <p className={taskIsDone? "done": "notDone"}>{item.title}</p>
      <input className="chek" type="checkbox" onClick={done} checked={taskIsDone}/>
      <button className="editeButton" onClick={openModal} id="edt">Edit</button>
        <Modal
          autoFocus={false}
          isOpen={modalIsOpenEdit}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <div>Edit mode</div>
            <form >
              <input
                autoFocus={true}
                value={newValueTodo||item.title}
                type="text"
                onChange={onInputChange}
              />
            <button onClick={editData} id="save">Save</button>
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
