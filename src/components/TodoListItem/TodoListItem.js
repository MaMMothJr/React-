import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import TodoList from '../TodoList/TodoList';
import PropTypes from 'prop-types';
import Main from '../Main/Main';

function TodoListItem({item}) {

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
    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
      setIsOpen(true);
    }

    function closeModal(){
      setIsOpen(false);
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

  return (
    <li className="listItem">
      <p>{item.title}</p>
      <button className="deleteButton" onClick={openModal}>Delete</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <div>Are u sure?</div>
            <form>
              <input />
              <button onClick={deleteData}>Yes</button>
              <button onClick={closeModal}>No</button>
              </form>
          </Modal>
      <button className="editeButton">Edite</button>
    </li>
  );
}

export default TodoListItem;

TodoListItem.propTypes = {
  item: PropTypes.object.isRequired
};
