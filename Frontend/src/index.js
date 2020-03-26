import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Render é colocar em tela, nesse caso colocando a importação App.js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);