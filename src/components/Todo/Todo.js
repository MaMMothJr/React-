import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Main/Main';

function Todo() {
  return (
    <div>
        <Header className="header" />
        <Main className="main" />
        <Footer className="footer" />
    </div>
  );
}

export default Todo;
